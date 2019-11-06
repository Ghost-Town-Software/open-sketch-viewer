import Konva from 'konva';
import {StylesContainer} from '../styles/styles-container';

export abstract class AbstractComponent {

  protected styles: StylesContainer = new StylesContainer();

  public abstract render(payload);

  public applyStyles(style) {
    this.styles.applyStyles(style);

    return this.styles.getStyles();
  }

  protected createBoundingRect(item: any) {
    const group = new Konva.Group({
      x: item.frame.x,
      y: item.frame.y,
      width: item.frame.width,
      height: item.frame.height,
    });

    group.add(this.drawRect(item));
    return group;
  }

  protected drawRect(item) {
    const rect = new Konva.Rect({
      width: item.frame.width,
      height: item.frame.height,
      stroke: '#333',
      strokeWidth: 1
    });

    const style = item.style;

    if (style.borders.length) {
      for (const border of style.borders) {
        if (!border.isEnabled) {
          continue;
        }

        rect.x(-border.thickness / 2);
        rect.y(-border.thickness / 2);
        rect.width(item.frame.width + border.thickness);
        rect.height(item.frame.height + border.thickness);
      }
    }

    return rect;
  }
}
