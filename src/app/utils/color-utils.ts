
export class ColorUtils {
  public static extractColor(attributes) {

    if(!attributes) {
      return 'rgba(0, 0, 0, 1)';
    }

    const red = Math.floor(attributes.blue * 255);
    const green = Math.floor(attributes.green * 255);
    const blue = Math.floor(attributes.blue * 255);
    const alpha = attributes.alpha || 1;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  public static extractHexColor(attributes) {

    if(!attributes) {
      return '#000000';
    }

    const red = Math.floor(attributes.blue * 255).toString(16);
    const green = Math.floor(attributes.green * 255).toString(16);
    const blue = Math.floor(attributes.blue * 255).toString(16);

    return `#${red}${green}${blue}`;
  }
}
