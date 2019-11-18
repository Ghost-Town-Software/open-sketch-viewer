import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {getService} from '../../injector.static';
import {ProjectService} from '../../services/project.service';
import {Image} from './parts/image.model';
import {environment} from '../../../environments/environment';

export class Bitmap extends BaseComponent {
  project: ProjectService;
  image: Image;
  clippingMask: string;
  fillReplacesImage: boolean;

  constructor(payload) {
    super(payload);

    this.project = getService(ProjectService);
    this.image = new Image(payload.image);
    this.clippingMask = payload.clippingMask;
    this.fillReplacesImage = payload.fillReplacesImage;
  }

  render() {
    this.canvas = new Konva.Group({
      ...this.frame,
      transformsEnabled: 'position',
    });

    const picture = this.project.getImage(this.image._ref);

    Konva.Image.fromURL(picture, (image) => {

      image.setAttrs({
        width: this.frame.width,
        height: this.frame.height,
        transformsEnabled: 'position',
      });

      this.canvas.add(image);

      if (environment.cache) {
        this.canvas.cache();
      }

      this.canvas.draw();
    });

    this.flip(this.canvas);
    return this.canvas;
  }
}
