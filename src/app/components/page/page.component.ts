import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'page',
  templateUrl: './page.template.html',
  styleUrls: ['./page.styles.scss']
})
export class PageComponent implements OnInit {

  page: any;
  artboards: any;

  public constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .subscribe(res => {
        this.page = res.page;
        this.artboards = this.projectService.getArtboards(this.page.do_objectID);
      });
  }
}
