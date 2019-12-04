import {TextAttributes} from './text-attributes.model';

export class StringAttribute {
  readonly _class: string = 'stringAttribute';
  location: number;
  length: number;
  attributes: TextAttributes;

  constructor(payload: StringAttribute) {
    this.location = payload.location;
    this.length = payload.length;
    this.attributes = new TextAttributes(payload.attributes);
  }
}
