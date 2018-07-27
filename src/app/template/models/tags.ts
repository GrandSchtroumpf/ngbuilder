import { NestedMenu } from '../../shared';
export const TAGS: NestedMenu[] = [
  {
    name: 'layouts',
    children: ['main', 'section', 'nav', 'header', 'footer']
  },
  {
    name: 'headers',
    children: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  },
  {
    name: 'multimedia',
    children: ['img', 'video', 'audio']
  },
  {
    name: 'forms',
    children: [
      'form',
      'fieldset',
      'button',
      'input',
      'label',
      'select',
      'textarea'
    ]
  }
];
