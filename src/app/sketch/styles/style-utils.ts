import {ColorUtils} from './color-utils';

export class StyleUtils {

  public static extractBorders(style) {

    const borderParams = { border: null };

    for (const border of style.borders) {
      if (!border.isEnabled) {
        continue;
      }

      const borderColor = ColorUtils.extractColor(border.color);

      borderParams.border = `${border.thickness}px solid ${borderColor}`;
    }

    return borderParams;
  }

  public static extractGradient(style) {
    if (style._class !== 'gradient') {
      console.error('Invalid style passed to extract gradient.', style);
      return null;
    }

    const gradientParams = {
      from: null, to: null, stops: []
    };

    gradientParams.from = style.from.replace(/[{}]/g, '', style.from).split(', ').map(parseFloat);
    gradientParams.to = style.to.replace(/[{}]/g, '', style.to).split(', ').map(parseFloat);

    for (const gradientStop of style.stops) {
      gradientParams.stops.push({
        color: ColorUtils.extractHexColor(gradientStop.color),
        position: gradientStop.position
      });
    }

    return gradientParams;
  }

}
