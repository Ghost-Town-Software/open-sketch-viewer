import {Injectable} from '@angular/core';
import {Project} from '../model/config.model';
import {Filesystem} from '../model/filesystem.model';
import {ModelFactory} from '../sketch/models/model-factory';
import {Text} from '../sketch/models/text.model';
import {ElectronService} from './electron.service';
import {BrowserWindow, remote} from 'electron';
import {FontUtil} from '../sketch/utils/font.util';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import {join} from 'path';
import {Font} from '../model/font.model';
import {BaseComponent} from '../sketch/models/base-component.model';

@Injectable({
  providedIn: 'root'
})
export class PrerenderService {
  private window: BrowserWindow;

  constructor(private electron: ElectronService) {

  }

  run(project: Project) {
    const filesystem = new Filesystem(project.path);
    rimraf.sync(join(project.path, 'text'));

    const texts: Text[] = this.findAllTextModels(filesystem);

    this.electron.ipcRenderer.once('font-loaded', () => {
      this.processing(texts, filesystem);
    });

    this.prepareWindow();

    this.window.setSize(texts[0].frame.width, texts[0].frame.height);
    this.window.loadURL('data:text/html;charset=UTF-8,' + encodeURIComponent(this.getHTML(filesystem)));
  }

  private processing(texts: Text[], filesystem: Filesystem, index = 0) {
    if (index >= texts.length) {
      this.window.destroy();
      return;
    }

    const text = texts[index];
    const path = filesystem.getText(text.do_objectID);

    this.window.setSize(text.frame.width, text.frame.height);
    this.window.webContents.send('html', text.getHTML());

    this.electron.ipcRenderer.once('capture', () => {
      console.log('capture');

      this.window.capturePage({
        x: 0, y: 0,
        width: text.frame.width,
        height: text.frame.height
      }).then(image => {
        fs.writeFileSync(path, image.toPNG());

        index++;

        this.processing(texts, filesystem, index);
      });
    });
  }

  private prepareWindow() {
    this.window = new remote.BrowserWindow({
      show: false,
      frame: false,
      useContentSize: true,
      center: true,
      resizable: true,
      fullscreen: false,
      webPreferences: {
        devTools: false,
        nodeIntegration: true
      },
    });
  }

  private findAllTextModels(fs: Filesystem): Text[] {
    const pages = fs.getPages();

    let texts: Text[] = [];

    for (const page of pages) {
      findRecursively(page, texts);
    }

    return texts;

    function findRecursively(item: BaseComponent, texts: BaseComponent[] = []) {
      if (item._class === 'text') {
        texts.push(ModelFactory.create(item));
        return;
      }

      if (item.layers) {
        for (const layer of item.layers) {
          findRecursively(layer, texts);
        }
      }
    }
  }

  private getHTML(filesystem: Filesystem) {
    return `<!doctype html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    html,body {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      overflow: hidden;
      background: rgba(0,0,0,0);
    }
  </style>
  <script>${this.getFontsScript(filesystem)}</script>
  <script>${this.getHtmlUpdateScript()}</script>
</head>
<body></body>
</html>`
  }

  private getHtmlUpdateScript() {
    return `
    ipcRenderer.on('html', (event, message) => {
      console.log('get message', message);
      document.body.innerHTML = message;
      setTimeout(() => {
        ipcRenderer.send('capture', true);
      }, 10);
    });
    `;
  }

  private getFontsScript(fs: Filesystem) {
    const meta = fs.getMeta();
    const fonts = meta.fonts;
    const toLoad: {[key: string]: number[]} = {};

    fonts.map((font: string) => {
      return FontUtil.toFont(font);
    }).forEach((font: Font) => {
      if (!toLoad.hasOwnProperty(font.family)) {
        toLoad[font.family] = [];
      }

      toLoad[font.family].push(font.weight);
    });

    const results = [];

    for (const key in toLoad) {
      if (!toLoad.hasOwnProperty(key)) {
        continue;
      }

      const weights = toLoad[key].join(',');
      results.push(`${key}:${weights}:latin-ext`);
    }

    const serialized = JSON.stringify(results);
    return `
    const WebFont = require('webfontloader');
    const electron = require('electron');
    const ipcRenderer = electron.ipcRenderer;
    
    const fonts = ${serialized};
    console.log('renderer', ipcRenderer);
    
    WebFont.load({
      google: {
        families: fonts
      },
      active() {
        ipcRenderer.send('font-loaded', true);
      },
      inactive() {
        ipcRenderer.send('font-loaded', false);
      }
    });
    `;
  }
}
