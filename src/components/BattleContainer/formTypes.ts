interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  value: HTMLInputElement;
}
export interface NameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
