import {Injectable} from '@angular/core';
import {BrowserWindow} from "electron";
import WebFont from 'webfontloader';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  private window: BrowserWindow;
  private loading: boolean | Promise<any> = false;

  constructor() {
    this.window = new BrowserWindow({
      show: true,
      backgroundColor: 'rgba(0,0,0,0)'
    });

    this.loading = this.window.loadFile('text.html').then(() => this.loading = false);
  }

  loadFonts(fonts) {
    const script = `
    WebFont.load({
      google: {
        families: ${fonts}
      },
      active() {
        console.log('Fonts loaded', ${fonts});
      },
      inactive() {
        console.log('Fonts can\'t be loaded', ${fonts});
      }
    });
    `;

    this.window.webContents.executeJavaScript(script);
  }
}
