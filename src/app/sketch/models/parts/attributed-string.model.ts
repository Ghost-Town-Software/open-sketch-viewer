import {StringAttribute} from './string-attribute.model';

export class AttributedString {
  readonly _class: string = 'attributedString';
  string: string;
  attributes: StringAttribute[];

  constructor({string, attributes}) {
    this.string = string;
    this.attributes = attributes.map(attribute => new StringAttribute(attribute));
  }
}
