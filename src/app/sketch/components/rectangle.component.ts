import Konva from 'konva';
import {Injectable} from '@angular/core';
import {AbstractComponent} from './abstract.component';
import {ColorStyle} from '../styles/color.style';

@Injectable({
  providedIn: 'root'
})
export class RectangleComponent extends AbstractComponent {

  render(payload) {
    const group = this.createBoundingRect(payload);
    const points = [];
    for (const point of payload.points) {
      points.push({ cornerRadius: point.cornerRadius });
    }

    const fill = {
      color: '#FFFFFF'
    };

    if (payload.style.fills.length > 0 && payload.style.fills[0].isEnabled) {
      const colorStyle = new ColorStyle();
      colorStyle.parseStyles(payload.style.fills[0].color);
      fill.color = colorStyle.getHexColor();
    }

    const rectangleStyles = this.applyStyles(payload.style);

    group.add(new Konva.Rect({
       x: 0,
       y: 0,
       width: payload.frame.width,
       height: payload.frame.height,
       cornerRadius: points.map(p => p.cornerRadius),
       fill: fill.color,
       ...rectangleStyles
     }));

    return group;
  }

}
