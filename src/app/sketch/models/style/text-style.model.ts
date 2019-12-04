import {TextAttributes} from '../parts/text-attributes.model';
import {TextAttributeStyle, TextStyle as KonvaTextStyle} from '../../../model/konva.model';


export class TextStyle {
  readonly _class: string = 'textStyle';
  do_objectID: string;
  encodedAttributes: TextAttributes;
  verticalAlignment: number;

  constructor({do_objectID, encodedAttributes, verticalAlignment}: TextStyle) {
    this.do_objectID = do_objectID;
    this.verticalAlignment = verticalAlignment;
    this.encodedAttributes = new TextAttributes(encodedAttributes);
  }

  value(): KonvaTextStyle {
    const values: TextAttributeStyle = this.encodedAttributes.value();

    return {
      verticalAlign: this.getVerticalAlignment(),
      display: 'table-cell',
      ...values
    }
  }

  css() {

  }

  getVerticalAlignment(): string {
    const alignments = ['top', 'middle', 'bottom'];

    return alignments[this.verticalAlignment];
  }
}
