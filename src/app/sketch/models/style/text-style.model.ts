import {TextAttributes} from '../parts/text-attributes.model';

export class TextStyle {
  readonly _class: string = 'textStyle';
  do_objectID: string;
  encodedAttributes: TextAttributes;
  verticalAlignment: number;

  constructor({do_objectID, encodedAttributes, verticalAlignment}) {
    this.do_objectID = do_objectID;
    this.verticalAlignment = verticalAlignment;
    this.encodedAttributes = new TextAttributes(encodedAttributes);
  }

  value() {
    return this.encodedAttributes.value();
  }

  css() {

  }
}
