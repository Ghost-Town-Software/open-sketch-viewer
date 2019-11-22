import {FontDescriptor} from '../style/font-descriptor.style';
import {Color} from '../style/color.model';
import {ParagraphStyle} from '../style/paragraph-style.style';
import {FontUtil} from '../../utils/font.util';

export class TextAttributes {
  MSAttributedStringFontAttribute: FontDescriptor;
  MSAttributedStringColorAttribute: Color;
  textStyleVerticalAlignmentKey: number;
  paragraphStyle: ParagraphStyle;
  kerning: number;

  constructor({
                MSAttributedStringFontAttribute, MSAttributedStringColorAttribute, textStyleVerticalAlignmentKey,
                paragraphStyle, kerning
              }) {
    this.MSAttributedStringFontAttribute = new FontDescriptor(MSAttributedStringFontAttribute);
    this.MSAttributedStringColorAttribute = new Color(MSAttributedStringColorAttribute);
    this.textStyleVerticalAlignmentKey = textStyleVerticalAlignmentKey;
    this.paragraphStyle = new ParagraphStyle(paragraphStyle);
    this.kerning = kerning;
  }


  value() {
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
