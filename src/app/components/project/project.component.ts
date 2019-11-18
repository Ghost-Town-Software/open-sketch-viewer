import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'project',
  styleUrls: ['./project.styles.scss'],
  templateUrl: './project.template.html'
})
export class ProjectComponent implements OnInit {
  pages: any;

  constructor(private project: ProjectService) {

  }

  ngOnInit(): void {
    console.log('blaaa');
    this.pages = this.project.getPages();
  }
}
