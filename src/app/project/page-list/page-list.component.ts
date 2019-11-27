import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'page-list',
  styleUrls: ['./page-list.styles.scss'],
  templateUrl: './page-list.template.html'
})
export class PageListComponent implements OnInit {
  pages: any;

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.pages = data.pages;
    });
  }
}
