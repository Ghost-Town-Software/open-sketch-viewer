import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'artboard',
  templateUrl: './artboard.template.html',
  styleUrls: ['./artboard.styles.scss']
})
export class ArtboardComponent implements OnInit {

  artboard: any;

  public constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        tap(data => console.log(data))
      )
      .subscribe(res => this.artboard = res.artboard);
  }
}
