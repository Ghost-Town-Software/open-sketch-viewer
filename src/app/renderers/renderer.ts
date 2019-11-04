import Konva from 'konva';

export abstract class Renderer {
  public abstract render(payload);

  protected applyStyles(shape, style) {
    if (style.blur.isEnabled) {
      console.log('Blur is not implemented yet.');
    }

    if (style.borderOptions.isEnabled) {
    }

    if (style.borders.length) {
      if (style.borders.length > 1) {
        console.warn('Item has more than one borders', shape, style);
      }

      for (const border of style.borders) {
        if (!border.isEnabled) {
          continue;
        }

        const red = border.color.red * 255;
        const green = border.color.green * 255;
        const blue = border.color.blue * 255;
        const alpha = border.color.alpha;

        shape.stroke(`rgba(${red}, ${green}, ${blue}, ${alpha})`);
        shape.strokeWidth(border.thickness);
      }
    }

    if (style.contextSettings.opacity) {
      shape.opacity(style.contextSettings.opacity);
    }
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
      stroke: '#000',
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
