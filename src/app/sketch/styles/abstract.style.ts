import {Style} from './style';
import * as _ from 'lodash';

export abstract class AbstractStyle implements Style {

  abstract styles: any;

  abstract getCss(): string;

  getStyles(): object {
    // console.log('abstract get styles');
    if (!this.styles.isEnabled) {
      return {};
    }
    return _.omit(this.styles, ['isEnabled']);
  }

  abstract parseStyles(payload: any): boolean;

}
