import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {getService} from '../../injector.static';
import {Image} from './parts/image.model';
import {environment} from '../../../environments/environment';
import {NewProjectService} from '../../project/project.service';

export class Bitmap extends BaseComponent {
  project: NewProjectService;
  image: Image;
  clippingMask: string;
  fillReplacesImage: boolean;

  constructor(payload) {
    super(payload);

    this.project = getService(NewProjectService);
    this.image = new Image(payload.image);
    this.clippingMask = payload.clippingMask;
    this.fillReplacesImage = payload.fillReplacesImage;
  }

  render() {
    this.canvas = new Konva.Group({
      ...this.frame,
      id: this.do_objectID,
      transformsEnabled: 'position',
    });

    const picture = this.project.getPath(this.image._ref);

    Konva.Image.fromURL(picture, (image) => {
      image.setAttrs({
        width: this.frame.width,
        height: this.frame.height,
        transformsEnabled: 'position',
      });

      this.canvas.add(image);
      this.bindEvents(image);

      if (environment.cache) {
        this.canvas.cache({offset: 5});
      }

      this.canvas.draw();
    });

    this.flip(this.canvas);
    return this.canvas;
  }
}
