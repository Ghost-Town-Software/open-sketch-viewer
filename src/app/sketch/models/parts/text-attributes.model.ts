import {FontDescriptor} from '../style/font-descriptor.style';
import {Color} from '../style/color.model';
import {ParagraphStyle} from '../style/paragraph-style.style';

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
    const font = this.MSAttributedStringFontAttribute.attributes.name.split('-');

    const fontSize = this.MSAttributedStringFontAttribute.attributes.size;
    const fill = this.MSAttributedStringColorAttribute.value();
    const lineHeight = this.paragraphStyle.maximumLineHeight === undefined ? 1 : (this.paragraphStyle.maximumLineHeight / fontSize);
    const fontFamily = font[0];
    const align = this.paragraphStyle.getAlignment();
    let fontStyle = 'normal';

    if(font.length > 1) {
      switch(font[1]) {
        case 'Black':
          fontStyle = '900';
          break;
        case 'Bold':
          fontStyle = '700';
          break;
        case 'Light':
          fontStyle = '300';
          break;
      }
    }

    return {
      fontStyle,
      fontSize,
      fill,
      lineHeight,
      fontFamily,
      align
    };
  }
}
