import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {NewProjectService} from '../project.service';

@Component({
  selector: 'artboard-list',
  templateUrl: './artboard-list.template.html',
  styleUrls: ['./artboard-list.styles.scss']
})
export class ArtboardListComponent implements OnInit {

  page: any;
  artboards: any;

  public constructor(private activatedRoute: ActivatedRoute, private project: NewProjectService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .subscribe(res => {
        console.log('data...', res);
        this.page = res.page;
        this.artboards = this.project.getArtboards(res.page);

        console.log('artboards', this.artboards);
      });
  }
}
