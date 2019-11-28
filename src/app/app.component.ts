import {Component, OnInit} from '@angular/core';
import {remote} from 'electron';
import {PrerenderService} from './services/prerender.service';
import {NewProjectService} from './project/project.service';

const {Menu, MenuItem} = remote;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'open-sketch-viewer';
  data: any;

  constructor(private prerender: PrerenderService, private project: NewProjectService) {

  }

  ngOnInit() {
    const template: any = [
      {
        label: 'Tools',
        submenu: [
          {
            label: 'Re-create text images',
            click: () => {
              if(this.project.getProject()) {
                this.prerender.run(this.project.getProject());
              }
            }
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }
}
