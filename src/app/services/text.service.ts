import {Injectable} from '@angular/core';
import {remote, BrowserWindow} from "electron";
import WebFont from 'webfontloader';
import {FontUtil} from '../sketch/utils/font.util';
import {Filesystem} from '../model/filesystem.model';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor() {
  }

}
