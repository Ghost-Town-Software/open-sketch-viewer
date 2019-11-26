import {Component, OnInit} from '@angular/core';
import {TextService} from '../../services/text.service';
import WebFont from 'webfontloader';

@Component({
  selector: 'text-renderer',
  styleUrls: ['./text-renderer.styles.scss'],
  templateUrl: './text-renderer.template.html'
})
export class TextRendererComponent implements OnInit {
  constructor(private text: TextService) {

  }

  ngOnInit() {
    console.log('iframe ready');

    window.addEventListener('message', (ev) => {
      if(ev.data instanceof Object) {
        const data = ev.data;

        if(data.type === 'font') {
        }
      }
    });
  }
}
