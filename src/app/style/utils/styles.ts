import { StyleGroup, StyleType, Property } from '../models';

export const background: StyleGroup = {
  name: 'background',
  declarations: [{
    property: Property.backgroundColor,
    type: StyleType.color
  }, {
    property: Property.backgroundSize,
    type: StyleType.number
  }]
};

export const border: StyleGroup = {
  name: 'border',
  declarations: [{
    property: 'border-style',
    type: StyleType.select,
    options: ['none', 'dotted', 'dashed', 'solid', 'groove', 'inset']
  }, {
    property: 'border-size',
    type: StyleType.number
  }]
};

export const font: StyleGroup = {
  name: 'font',
  declarations: [{
    property: 'color',
    type: StyleType.color
  }, {
    property: 'font-size',
    type: StyleType.number
  }]
};


export const styleGroups: StyleGroup[] = [
  background,
  border,
  font
];
