export interface DynamicForm {
  type: string;
  fieldName: string;
  required: boolean;
  label: string;
  placeholder?: string;
  multiple?: boolean;
  options?: Option[];
}

export interface Option {
  label: string;
  value: string | number | boolean;
}
