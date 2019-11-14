import Konva from 'konva';
import {AbstractComponent} from './abstract.component';
import {Group} from 'konva/types/Group';

export class RectangleComponent extends AbstractComponent {

  render(): Group {
    const group = this.createBoundingRect();
    const points = [];
    for (const point of this.data.points) {
      points.push({cornerRadius: point.cornerRadius});
    }

    const rectangleStyles = this.applyStyles(this.data.style);

    group.add(new Konva.Rect({
      x: 0,
      y: 0,
      width: this.data.frame.width,
      height: this.data.frame.height,
      cornerRadius: points.map(p => p.cornerRadius),
      ...rectangleStyles
    }));

    return group;
  }

}
