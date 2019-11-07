import {Style} from './style';
import {ColorStyle} from './color.style';
import {AbstractStyle} from './abstract.style';

export class GradientStyle extends AbstractStyle implements Style {
  styles: any = {
    isEnabled: false
  };

  getCss(): string {
    return '';
  }

  parseStyles(styleObj: any): boolean {

    if (styleObj._class !== 'gradient') {
      console.error('Invalid style passed to extract gradient.', styleObj);
      return false;
    }

    const gradientParams = {
      isEnabled: styleObj.isEnabled,
      fillLinearGradientStartPoint: null,
      fillLinearGradientEndPoint: null,
      fillLinearGradientColorStops: []
    };

    const from = styleObj.from.replace(/[{}]/g, '', styleObj.from).split(', ').map(parseFloat);
    const to = styleObj.to.replace(/[{}]/g, '', styleObj.to).split(', ').map(parseFloat);

    gradientParams.fillLinearGradientStartPoint = {
      x: from[0],
      y: from[1]
    };

    gradientParams.fillLinearGradientEndPoint = {
      x: to[0],
      y: to[1]
    };

    for (const gradientStop of styleObj.stops) {
      const color = new ColorStyle();
      color.parseStyles(gradientStop.color);
      gradientParams.fillLinearGradientColorStops.push([gradientStop.position, color.getHexColor()]);
    }

    this.styles = gradientParams;

    return true;
  }

}
