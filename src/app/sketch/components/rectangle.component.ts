import Konva from 'konva';
import {Injectable} from '@angular/core';
import {AbstractComponent} from './abstract.component';
import {ColorUtils} from '../styles/color-utils';
import {StyleUtils} from '../styles/style-utils';

@Injectable({
  providedIn: 'root'
})
export class RectangleComponent extends AbstractComponent {

  render(payload) {
    const group = this.createBoundingRect(payload);
    console.log('rendering rectangle', payload);

    const points = [];
    for (const point of payload.points) {
      points.push({ cornerRadius: point.cornerRadius });
    }

    const fill = {
      color: '#FFFFFF',
      gradient: null
    };

    const shadow = {
      color: 'black',
      blur: 0,
      offset: { x: 0, y: 0 },
      opacity: 0
    };

    if (payload.style.fills.length > 0 && payload.style.fills[0].isEnabled) {
      fill.color = ColorUtils.extractHexColor(payload.style.fills[0].color);
      fill.gradient = StyleUtils.extractGradient(payload.style.fills[0].gradient);
    }

    if (payload.style.shadows.length > 0 && payload.style.shadows[0].isEnabled) {
      const shadowAttr = payload.style.shadows[0];
      shadow.color = ColorUtils.extractHexColor(shadowAttr.color);
      shadow.opacity = shadowAttr.color.alpha;
      shadow.offset.x = shadowAttr.offsetX;
      shadow.offset.y = shadowAttr.offsetY;
      shadow.blur = shadowAttr.blurRadius;
    }

    const rect = {
      x: 0,
      y: 0,
      width: payload.frame.width,
      height: payload.frame.height,
      cornerRadius: points.map(p => p.cornerRadius),
      fill: fill.color,
      shadowColor: shadow.color,
      shadowBlur: shadow.blur,
      shadowOffset: shadow.offset,
      shadowOpacity: shadow.opacity,
      fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientEndPoint: { x: 0, y: 0 },
      fillLinearGradientColorStops: []
    };

    if (fill.gradient) {
      rect.fillLinearGradientStartPoint = {
        x: fill.gradient.from[0],
        y: fill.gradient.from[1]
      };
      rect.fillLinearGradientEndPoint = {
        x: fill.gradient.to[0],
        y: fill.gradient.to[1]
      };

      let stops = [];
      for (const gradientStop of fill.gradient.stops) {
        stops = stops.concat([gradientStop.position, gradientStop.color]);
      }
      rect.fillLinearGradientColorStops = stops;
    }

    console.log('create rect with attributes', rect);
    group.add(new Konva.Rect(rect));

    return group;
  }

}
