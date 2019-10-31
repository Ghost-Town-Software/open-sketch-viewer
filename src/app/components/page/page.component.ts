import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'page',
  templateUrl: './page.template.html',
  styleUrls: ['./page.styles.scss']
})
export class PageComponent implements OnInit {

  page: any;

  public constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(res => this.page = res.page);
  }
}
