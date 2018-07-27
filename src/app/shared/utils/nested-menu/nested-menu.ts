export interface NestedMenu {
  name: string;
  icon?: string;
  route?: string;
  children?: NestedMenu[] | string[];
}
