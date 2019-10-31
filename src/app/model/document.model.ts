// tslint:disable:variable-name

export class Document {
  readonly _class: string = 'document';
  assets: any[];
  colorSpace: number;
  currentPageIndex: number;
  do_objectID: string;
  foreignLayerStyles: any[];
  foreignSymbols: any[];
  foreignTextStyles: any[];
  layerStyles: SharedStyleContainer;
  layerSymbols: SymbolContainer;
  layerTextStyles: SharedTextStyleContainer;
  pages: Page[];
  userInfo: any; // not used
}

export class Page {
  readonly _class: 'MSJSONFileReference';
  _ref: string;
  _ref_class: string;
}

export class SharedTextStyleContainer {
  readonly _class: string = 'sharedTextStyleContainer';
  objects: any[];
}

export class SharedStyleContainer {
  readonly _class: string = 'sharedStyleContainer';
  objects: any[];
}

export class SharedStyle {
  readonly _class: string = 'sharedStyle';

  do_objectID: string;
  name: string;
  value: {};
}

export class Style {

}

export class SymbolContainer {
  readonly _class: string = 'symbolContainer';
  objects: any[];
}
