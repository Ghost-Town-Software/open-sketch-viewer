import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {AttributedString} from './parts/attributed-string.model';
import {environment} from '../../../environments/environment';
import {getService} from '../../injector.static';
import {NewProjectService} from '../../project/project.service';

export class Text extends BaseComponent {
  readonly _class: string = 'text';

  attributedString: AttributedString;
  dontSynchroniseWithSymbol: boolean;
  glyphBounds: string;
  lineSpacingBehaviour: number;
  textBehaviour: number;
  editor;

  private project: NewProjectService;

  constructor(payload) {
    super(payload);

    this.attributedString = new AttributedString(payload.attributedString);
    this.dontSynchroniseWithSymbol = payload.dontSynchroniseWithSymbol;
    this.glyphBounds = payload.glyphBounds;
    this.lineSpacingBehaviour = payload.lineSpacingBehaviour;
    this.textBehaviour = payload.textBehaviour;

    this.project = getService(NewProjectService);
  }

  getHTML(): string {
    const styles: any = this.style.value() || {};

    const content: HTMLElement = document.createElement('div');
    content.style.width = this.frame.width + 'px';
    content.style.height = this.frame.height + 'px';
    content.style.margin = '0';
    content.style.padding = '0';
    content.style.whiteSpace = 'pre-wrap';
    content.style.letterSpacing = 'normal';

    Object.assign(content.style, styles);

    this.attributedString.attributes.forEach(attribute => {
      const innerStyle = attribute.attributes.value();
      const value = this.attributedString.string.substr(attribute.location, attribute.length);
      const span: HTMLElement = document.createElement('span');
      span.innerText = value;

      Object.assign(span.style, innerStyle);

      content.appendChild(span);
    });

    const text: HTMLElement = document.createElement('div');
    text.innerHTML = '';
    text.appendChild(content);

    return text.innerHTML;
  }

  render() {
    this.canvas = new Konva.Group({
      ...this.frame,
      transformsEnabled: 'position',
    });

    const picture = this.project.getTextPath(this.do_objectID);

    Konva.Image.fromURL(picture, (image) => {
      image.setAttrs({
        width: this.frame.width,
        height: this.frame.height,
        transformsEnabled: 'position',
      });

      this.canvas.add(image);
      this.bindEvents(image);

      if (environment.cache) {
        this.canvas.cache();
      }

      this.canvas.draw();
    });

    this.flip(this.canvas);

    return this.canvas;
  }
}
