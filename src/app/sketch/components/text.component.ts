import Konva from 'konva';
import {Injectable} from '@angular/core';
import {AbstractComponent} from './abstract.component';
import {ColorStyle} from '../styles/color.style';

@Injectable({
  providedIn: 'root'
})
export class TextComponent extends AbstractComponent {

  private defaultFontAttribute = {
    attributes: {
      name: 'Calibri',
      size: 16
    }
  };

  public render(payload) {
    console.log('text renderer', payload);
    const group = this.createBoundingRect(payload);

    const textObj = payload.attributedString;
    const textAttributes = textObj.attributes.length > 0 ? textObj.attributes[0].attributes : {};

    const fontAttributes = textAttributes.MSAttributedStringFontAttribute || this.defaultFontAttribute;
    const colorAttributes = textAttributes.MSAttributedStringColorAttribute;
    const paragraphStyle = textAttributes.paragraphStyle || { maximumLineHeight: 24 };

    const lineHeight = this.getLineHeight(fontAttributes, paragraphStyle);

    const color = new ColorStyle();
    color.parseStyles(colorAttributes);

    group.add(new Konva.Text({
      text: textObj.string,
      fontFamily: fontAttributes.attributes.name,
      fontSize: fontAttributes.attributes.size,
      fill: color.getHexColor(),
      lineHeight
    }));

    return group;
  }

  private getLineHeight(fontAttributes, paragraphStyle) {
      const fontSize = fontAttributes.attributes.size;
      return paragraphStyle.maximumLineHeight / fontSize;
  }
}
