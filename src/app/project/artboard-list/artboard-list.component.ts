import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewProjectService} from '../project.service';
import {Page} from '../../model/document.model';

@Component({
  selector: 'artboard-list',
  templateUrl: './artboard-list.template.html',
  styleUrls: ['./artboard-list.styles.scss']
})
export class ArtboardListComponent implements OnInit {
  page: Page;
  artboards: any;

  public constructor(private activatedRoute: ActivatedRoute,
                     private project: NewProjectService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .subscribe(res => {
        this.page = res.page;
        this.artboards = this.project.getArtboards(res.page);
      });
  }
}
