import {AfterViewInit, Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'artboard',
  templateUrl: './artboard.template.html',
  styleUrls: ['./artboard.styles.scss']
})
export class ArtboardComponent implements OnInit, AfterViewInit {
  @ViewChild('main', {static: true}) main;
  @ViewChild('header', {static: true}) header;

  artboard: any;

  public constructor(private activatedRoute: ActivatedRoute, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        tap(data => console.log(data))
      )
      .subscribe(res => this.artboard = res.artboard);
  }

  ngAfterViewInit(): void {
    this.resize();
  }

  @HostListener('window:resize')
  resize() {
    const height = window.innerHeight - this.header.nativeElement.clientHeight;

    this.renderer.setStyle(this.main.nativeElement, 'height', height + 'px');
  }
}
