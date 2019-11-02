export abstract class Renderer {
  public abstract render(payload);

  protected applyStyles(shape, style) {
    if (style.blur.isEnabled) {
      console.log('Blur is not implemented yet.');
    }

    if (style.borderOptions.isEnabled) {
    }

    if (style.borders.length) {
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
}
