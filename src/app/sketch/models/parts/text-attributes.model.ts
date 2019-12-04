import {FontDescriptor} from '../style/font-descriptor.style';
import {Color} from '../style/color.model';
import {ParagraphStyle} from '../style/paragraph-style.style';
import {FontUtil} from '../../utils/font.util';
import {TextAttributeStyle} from '../../../model/konva.model';

export class TextAttributes {
  MSAttributedStringFontAttribute: FontDescriptor;
  MSAttributedStringColorAttribute: Color;
  textStyleVerticalAlignmentKey: number;
  paragraphStyle: ParagraphStyle;
  kerning: number;

  constructor(payload: TextAttributes) {
    this.MSAttributedStringFontAttribute = new FontDescriptor(payload.MSAttributedStringFontAttribute);
    this.MSAttributedStringColorAttribute = new Color(payload.MSAttributedStringColorAttribute);
    this.textStyleVerticalAlignmentKey = payload.textStyleVerticalAlignmentKey;
    this.paragraphStyle = new ParagraphStyle(payload.paragraphStyle);
    this.kerning = payload.kerning;
  }


  value(): TextAttributeStyle {
    const font = FontUtil.toFont(this.MSAttributedStringFontAttribute.attributes.name);
    const fontSize = this.MSAttributedStringFontAttribute.attributes.size;
    const color = this.MSAttributedStringColorAttribute.value();
    const align = this.paragraphStyle.getAlignment();
    const fontStyle = 'normal';

    return {
      fontFamily: font.family,
      fontWeight: font.weight,
      fontSize: fontSize + 'px',
      lineHeight: (this.paragraphStyle.maximumLineHeight || fontSize) + 'px',
      textAlign: align,
      fontStyle,
      color
    };
  }
}
