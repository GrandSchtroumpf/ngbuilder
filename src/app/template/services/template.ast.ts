import { Injectable } from '@angular/core';
import {
  DefaultTreeDocument,
  DefaultTreeDocumentFragment,
  DefaultTreeElement,
  DefaultTreeCommentNode,
  DefaultTreeTextNode,
  Attribute,
  ParentNode,
  DefaultTreeNode,
  DefaultTreeParentNode,
  TreeAdapter
} from 'parse5';

@Injectable({
  providedIn: 'root'
})
export class TemplateAst implements TreeAdapter {
  public createDocument(): DefaultTreeDocument {
    return {
      nodeName: '#document',
      mode: 'no-quirks',
      childNodes: []
    };
  }

  public createDocumentFragment(): DefaultTreeDocumentFragment {
    return {
      nodeName: '#document-fragment',
      childNodes: []
    };
  }

  public createElement(
    tagName: string,
    namespaceURI: string = 'http://www.w3.org/1999/xhtml',
    attrs: Attribute[]
  ): DefaultTreeElement {
    return {
      nodeName: tagName,
      tagName,
      attrs,
      namespaceURI,
      childNodes: [],
      parentNode: null
    };
  }

  public createCommentNode(data: string): DefaultTreeCommentNode {
    return { nodeName: '#comment', data, parentNode: null };
  }

  public createTextNode(value: string): DefaultTreeTextNode {
    return { nodeName: '#text', value, parentNode: null };
  }

  /**
   * TREE MUTATION
   */

  public appendChild(parentNode: DefaultTreeParentNode, newNode) {
    parentNode.childNodes.push(newNode);
    newNode.parentNode = parentNode;
  }

  public insertBefore(parentNode, newNode, referenceNode) {
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);

    parentNode.childNodes.splice(insertionIdx, 0, newNode);
    newNode.parentNode = parentNode;
  }

  public setTemplateContent(templateElement, contentElement) {
    templateElement.content = contentElement;
  }

  public getTemplateContent(templateElement) {
    return templateElement.content;
  }

  public setDocumentType(document, name, publicId, systemId) {
    let doctypeNode = null;

    for (let i = 0; i < document.childNodes.length; i++) {
      if (document.childNodes[i].nodeName === '#documentType') {
        doctypeNode = document.childNodes[i];
        break;
      }
    }

    if (doctypeNode) {
      doctypeNode.name = name;
      doctypeNode.publicId = publicId;
      doctypeNode.systemId = systemId;
    } else {
      this.appendChild(document, {
        nodeName: '#documentType',
        name: name,
        publicId: publicId,
        systemId: systemId
      });
    }
  }

  public setDocumentMode(document, mode) {
    document.mode = mode;
  }

  public getDocumentMode(document) {
    return document.mode;
  }

  public detachNode(node) {
    if (node.parentNode) {
      const idx = node.parentNode.childNodes.indexOf(node);

      node.parentNode.childNodes.splice(idx, 1);
      node.parentNode = null;
    }
  }

  public insertText(parentNode, text) {
    if (parentNode.childNodes.length) {
      const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];

      if (prevNode.nodeName === '#text') {
        prevNode.value += text;
        return;
      }
    }

    this.appendChild(parentNode, this.createTextNode(text));
  }

  public insertTextBefore(parentNode, text, referenceNode) {
    const prevNode =
      parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];

    if (prevNode && prevNode.nodeName === '#text') {
      prevNode.value += text;
    } else {
      this.insertBefore(parentNode, this.createTextNode(text), referenceNode);
    }
  }

  public adoptAttributes(recipient, attrs) {
    const recipientAttrsMap = [];

    for (let i = 0; i < recipient.attrs.length; i++) {
      recipientAttrsMap.push(recipient.attrs[i].name);
    }

    for (let j = 0; j < attrs.length; j++) {
      if (recipientAttrsMap.indexOf(attrs[j].name) === -1) {
        recipient.attrs.push(attrs[j]);
      }
    }
  }

  /**
   * TREE TRAVERSING
   */

  public getFirstChild(node) {
    return node.childNodes[0];
  }

  public getChildNodes(node) {
    return node.childNodes;
  }

  public getParentNode(node) {
    return node.parentNode;
  }

  public getAttrList(element) {
    return element.attrs;
  }

  /**
   * NODE DATA
   */

  public getTagName(element) {
    return element.tagName;
  }

  public getNamespaceURI(element) {
    return element.namespaceURI;
  }

  public getTextNodeContent(textNode) {
    return textNode.value;
  }

  public getCommentNodeContent(commentNode) {
    return commentNode.data;
  }

  public getDocumentTypeNodeName(doctypeNode) {
    return doctypeNode.name;
  }

  public getDocumentTypeNodePublicId(doctypeNode) {
    return doctypeNode.publicId;
  }

  public getDocumentTypeNodeSystemId(doctypeNode) {
    return doctypeNode.systemId;
  }

  /**
   * NODE TYPES
   */

  public isTextNode(node) {
    return node.nodeName === '#text';
  }

  public isCommentNode(node) {
    return node.nodeName === '#comment';
  }

  public isDocumentTypeNode(node) {
    return node.nodeName === '#documentType';
  }

  public isElementNode(node) {
    return !!node.tagName;
  }

  // Source code location
  public setNodeSourceCodeLocation(node, location) {
    node.sourceCodeLocation = location;
  }

  public getNodeSourceCodeLocation(node) {
    return node.sourceCodeLocation;
  }
}
