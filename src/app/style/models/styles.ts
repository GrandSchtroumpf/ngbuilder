
export enum StyleType {
  color = 'color',
  number = 'number',
  select = 'select'
}

export interface StyleDeclaration {
  property: string;
  type: StyleType;
  options?: string[];
}

export interface StyleGroup {
  name: string;
  opened?: boolean;
  declarations: StyleDeclaration[];
}

