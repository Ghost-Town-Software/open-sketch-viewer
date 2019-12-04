import {Font} from '../../model/font.model';

const WEIGHTS: {[key: string]: number} = {
  black: 900,
  bold: 700,
  medium: 500,
  regular: 400,
  light: 300,
  thin: 100
};

export class FontUtil {
  static toFont(str: string): Font {
    const parts = str.split('-');
    const family = parts[0];

    if (parts.length === 1) {
      return {
        family,
        weight: 400
      };
    }

    let weight: number = Number(parts[1].toLowerCase());

    if (WEIGHTS.hasOwnProperty(weight)) {
      weight = WEIGHTS[weight];
    }

    return {
      family: parts[0],
      weight
    };
  }
}
