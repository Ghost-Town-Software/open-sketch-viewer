import {TextAttributes} from './text-attributes.model';

export class StringAttribute {
  readonly _class: string = 'stringAttribute';
  location: number;
  length: number;
  attributes: TextAttributes;

  constructor({location, length, attributes}) {
    this.location = location;
    this.length = length;
    this.attributes = new TextAttributes(attributes);
  }
}
