import {StringAttribute} from './string-attribute.model';

export class AttributedString {
  readonly _class: string = 'attributedString';
  string: string;
  attributes: StringAttribute[];

  constructor(payload: AttributedString) {
    this.string = payload.string.replace('\u{2028}', '');
    this.attributes = payload.attributes.map(attribute => new StringAttribute(attribute));
  }
}
