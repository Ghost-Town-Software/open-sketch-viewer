import {join} from 'path';
import {existsSync, mkdirSync, readFileSync} from 'fs';
import {Document} from './document.model';
import {Page} from '../sketch/models/page.model';

export class Filesystem {
  private readonly root: string;

  constructor(root: string) {
    this.root = root;
  }

  getPath(path: string): string {
    return join(this.root, path);
  }

  getText(id: string): string {
    const destination = join(this.root, 'text');
    if(!existsSync(destination)) {
      mkdirSync(destination);
    }

    return join(destination, id + '.png');
  }

  getDocument(): Document {
    const content = readFileSync(join(this.root, 'document.json'));

    return JSON.parse(content.toString());
  }

  getMeta() {
    const content = readFileSync(join(this.root, 'meta.json'));

    return JSON.parse(content.toString());
  }

  getPages(): Page[] {
    const document = this.getDocument();
    const pages: Page[] = [];

    for (const page of document.pages) {
      pages.push(this.getPage(page._ref));
    }

    return pages;
  }

  getPage(ref: string): Page {
    if(ref.indexOf('pages/') === -1) {
      ref = `pages/${ref}`;
    }

    const content = readFileSync(join(this.root, `${ref}.json`));

    return JSON.parse(content.toString());
  }
}
