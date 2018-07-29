const commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

export interface StyleError extends Error {
  reason: string;
  filename: string;
  line: number;
  column: number;
  source: string;
}

export interface StyleParserOptions {
  /** silent: silently fail on parse errors. */
  silent?: boolean;
  /** the path to the file containing css */
  source?: string;
}

/** Store position information for a node */
class Position {
  public start: { line: number, column: number };
  public end: { line: number, column: number };
  public source: string;
  /** Non-enumerable source string */
  public content: string;

  constructor(start, content: string, options?: StyleParserOptions) {
    this.start = start;
    this.end = start;
    this.source = options.source;
  }
}



/**
 * Parse a CSS string into an AST
 * @param css
 * @param options
 */
export function parse(css: string, options?: StyleParserOptions) {
  options = options || {};



  /**************
   * POSITION
   */

  let lineno = 1;
  let column = 1;

  /**  Update lineno and column based on `str`. */
  function updatePosition(str: string) {
    const lines = str.match(/\n/g);
    if (lines) { lineno += lines.length; }
    const i = str.lastIndexOf('\n');
    /* tslint:disable */
    column = ~i ? str.length - i : column + str.length;
    /* tslint:enable */
  }

  /** Mark position and patch `node.position` */
  function position() {
    const start = { line: lineno, column: column };
    return function(node) {
      node.position = new Position(start, css, options);
      whitespace();
      return node;
    };
  }

  /************
   * ERRORS
   */

  const errorsList = [];

  function error(msg) {
    const err: Partial<StyleError> = {
      ...new Error(options.source + ':' + lineno + ':' + column + ': ' + msg)
    };
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = css;

    if (options.silent) {
      errorsList.push(err);
    } else {
      throw err;
    }
  }


  /**********
   * UTILS
   */

   /** Trim a string */
  function trim(str) {
    return str ? str.replace(/^\s+|\s+$/g, '') : '';
  }


  /** Match `re` and return captures. */
  function match(re) {
    const m = re.exec(css);
    if (!m) { return; }
    const str = m[0];
    updatePosition(str);
    css = css.slice(str.length);
    return m;
  }

  /**
   * Parse whitespace.
   */

  function whitespace() {
    match(/^\s*/);
  }

  /**
   * Opening brace.
   */

  function open() {
    return match(/^{\s*/);
  }

  /**
   * Closing brace.
   */

  function close() {
    return match(/^}/);
  }

  /**********
   * PARSER
   */


  function stylesheet() {
    const rulesList = rules();

    return {
      type: 'stylesheet',
      stylesheet: {
        source: options.source,
        rules: rulesList,
        parsingErrors: errorsList
      }
    };
  }


  /**
   * Parse ruleset.
   */

  function rules() {
    let node;
    const ruleList = [];
    whitespace();
    comments(ruleList);
    while (css.length && css.charAt(0) !== '}' && (node = atrule() || rule())) {
      if (node !== false) {
        ruleList.push(node);
        comments(ruleList);
      }
    }
    return ruleList;
  }


  /**
   * Parse comments;
   */

  function comments(ruleList: any[] = []) {
    let c;
    while (c = comment()) {
      if (c !== false) {
        ruleList.push(c);
      }
    }
    return ruleList;
  }

  /**
   * Parse comment.
   */

  function comment() {
    const pos = position();
    if ('/' !== css.charAt(0) || '*' !== css.charAt(1)) { return; }

    let i = 2;
    while ('' !== css.charAt(i)
      && ('*' !== css.charAt(i) || '/' !== css.charAt(i + 1))
    ) { ++i; }
    i += 2;

    if ('' === css.charAt(i - 1)) {
      throw error('End of comment missing');
    }

    const str = css.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    css = css.slice(i);
    column += 2;

    return pos({
      type: 'comment',
      comment: str
    });
  }

  /**
   * Parse selector.
   */

  function selector() {
    const matched = match(/^([^{]+)/);
    if (!matched) { return; }
    /* @fix Remove all comments from selectors
     * http://ostermiller.org/findcomment.html */
    return trim(matched[0])
      .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '')
      .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, (m) => {
        return m.replace(/,/g, '\u200C');
      })
      .split(/\s*(?![^(]*\)),\s*/)
      .map(function(s) {
        return s.replace(/\u200C/g, ',');
      });
  }

  /**
   * Parse declaration.
   */

  function declaration() {
    const pos = position();

    // prop
    let prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!prop) { return; }
    prop = trim(prop[0]);

    // :
    if (!match(/^:\s*/)) { return error('property missing ":"'); }

    // val
    const val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);

    const ret = pos({
      type: 'declaration',
      property: prop.replace(commentre, ''),
      value: val ? trim(val[0]).replace(commentre, '') : ''
    });

    // ;
    match(/^[;\s]*/);

    return ret;
  }

  /**
   * Parse declarations.
   */

  function declarations() {
    const decls = [];

    if (!open()) { return error('missing "{"'); }
    comments(decls);

    // declarations
    let decl;
    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }

    if (!close()) { return error('missing "}"'); }
    return decls;
  }

  /**
   * Parse keyframe.
   */

  function keyframe() {
    let m;
    const vals = [];
    const pos = position();

    while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
      vals.push(m[1]);
      match(/^,\s*/);
    }

    if (!vals.length) { return; }

    return pos({
      type: 'keyframe',
      values: vals,
      declarations: declarations()
    });
  }

  /**
   * Parse keyframes.
   */

  function atkeyframes() {
    const pos = position();
    let matched = match(/^@([-\w]+)?keyframes\s*/);

    if (!matched) { return; }
    const vendor = matched[1];

    // identifier
    matched = match(/^([-\w]+)\s*/);
    if (!matched) { return error('@keyframes missing name'); }
    const name = matched[1];

    if (!open()) { return error('@keyframes missing "{"'); }

    let frame;
    let frames = comments();
    while (frame = keyframe()) {
      frames.push(frame);
      frames = frames.concat(comments());
    }

    if (!close()) { return error('@keyframes missing "}"'); }

    return pos({
      type: 'keyframes',
      name: name,
      vendor: vendor,
      keyframes: frames
    });
  }

  /**
   * Parse supports.
   */

  function atsupports() {
    const pos = position();
    const matched = match(/^@supports *([^{]+)/);

    if (!matched) { return; }
    const supports = trim(matched[1]);

    if (!open()) { return error('@supports missing "{"'); }

    const style = comments().concat(rules());

    if (!close()) { return error('@supports missing "}"'); }

    return pos({
      type: 'supports',
      supports: supports,
      rules: style
    });
  }

  /**
   * Parse host.
   */

  function athost() {
    const pos = position();
    const matched = match(/^@host\s*/);

    if (!matched) { return; }

    if (!open()) { return error('@host missing "{"'); }

    const style = comments().concat(rules());

    if (!close()) { return error('@host missing "}"'); }

    return pos({
      type: 'host',
      rules: style
    });
  }

  /**
   * Parse media.
   */

  function atmedia() {
    const pos = position();
    const m = match(/^@media *([^{]+)/);

    if (!m) { return; }
    const media = trim(m[1]);

    if (!open()) { return error('@media missing "{"'); }

    const style = comments().concat(rules());

    if (!close()) { return error('@media missing "}"'); }

    return pos({
      type: 'media',
      media: media,
      rules: style
    });
  }


  /**
   * Parse custom-media.
   */

  function atcustommedia() {
    const pos = position();
    const m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
    if (!m) { return; }

    return pos({
      type: 'custom-media',
      name: trim(m[1]),
      media: trim(m[2])
    });
  }

  /**
   * Parse paged media.
   */

  function atpage() {
    const pos = position();
    const m = match(/^@page */);
    if (!m) { return; }

    const sel = selector() || [];

    if (!open()) { return error('@page missing "{"'); }
    let decls = comments();

    // declarations
    let decl;
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) { return error('@page missing "}"'); }

    return pos({
      type: 'page',
      selectors: sel,
      declarations: decls
    });
  }

  /**
   * Parse document.
   */

  function atdocument() {
    const pos = position();
    const m = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m) { return; }

    const vendor = trim(m[1]);
    const doc = trim(m[2]);

    if (!open()) { return error('@document missing "{"'); }

    const style = comments().concat(rules());

    if (!close()) { return error('@document missing "}"'); }

    return pos({
      type: 'document',
      document: doc,
      vendor: vendor,
      rules: style
    });
  }

  /**
   * Parse font-face.
   */

  function atfontface() {
    const pos = position();
    const m = match(/^@font-face\s*/);
    if (!m) { return; }

    if (!open()) { return error('@font-face missing "{"'); }
    let decls = comments();

    // declarations
    let decl;
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) { return error('@font-face missing "}"'); }

    return pos({
      type: 'font-face',
      declarations: decls
    });
  }

  /**
   * Parse import
   */

  const atimport = _compileAtrule('import');

  /**
   * Parse charset
   */

  const atcharset = _compileAtrule('charset');

  /**
   * Parse namespace
   */

  const atnamespace = _compileAtrule('namespace');

  /**
   * Parse non-block at-rules
   */


  function _compileAtrule(name) {
    const re = new RegExp('^@' + name + '\\s*([^;]+);');
    return function() {
      const pos = position();
      const m = match(re);
      if (!m) { return; }
      const ret = { type: name };
      ret[name] = m[1].trim();
      return pos(ret);
    };
  }

  /**
   * Parse at rule.
   */

  function atrule() {
    if (css[0] !== '@') { return; }

    return atkeyframes()
      || atmedia()
      || atcustommedia()
      || atsupports()
      || atimport()
      || atcharset()
      || atnamespace()
      || atdocument()
      || atpage()
      || athost()
      || atfontface();
  }

  /**
   * Parse rule.
   */

  function rule() {
    const pos = position();
    const sel = selector();

    if (!sel) { return error('selector missing'); }
    comments();

    return pos({
      type: 'rule',
      selectors: sel,
      declarations: declarations()
    });
  }

  return addParent(stylesheet());
}

/**
 * Trim `str`.
 */


/**
 * Adds non-enumerable parent node reference to each node.
 */

export function addParent(obj, parent?) {
  const isNode = obj && typeof obj.type === 'string';
  const childParent = isNode ? obj : parent;

  for (const key in obj) {
    if (!!obj[key]) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach(function(v) { addParent(v, childParent); });
      } else if (value && typeof value === 'object') {
        addParent(value, childParent);
      }
    }
  }

  if (isNode) {
    Object.defineProperty(obj, 'parent', {
      configurable: true,
      writable: true,
      enumerable: false,
      value: parent || null
    });
  }

  return obj;
}
