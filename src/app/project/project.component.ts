import {Component, OnInit} from '@angular/core';
import {PrerenderService} from '../services/prerender.service';

@Component({
  selector: 'project',
  templateUrl: './project.template.html',
  styleUrls: ['./project.styles.scss']
})
export class ProjectComponent implements OnInit {
  constructor(private prerender: PrerenderService) {

  }

  ngOnInit(): void {
    // this.prerender.run({
    //   name: '',
    //   createdAt: null,
    //   id: null,
    //   path: 'D:\\Projekty\\open-sketch-viewer\\.sketch\\ekooltura'
    // });
  }
}
