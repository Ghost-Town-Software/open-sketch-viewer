import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import {CanvasService} from '../../services/canvas.service';

@Component({
  selector: 'artboard',
  templateUrl: './artboard.template.html',
  styleUrls: ['./artboard.styles.scss']
})
export class ArtboardComponent implements OnInit, AfterViewInit {
  @ViewChild('workspace', {static: true}) workspace: ElementRef;

  artboard: any;

  public constructor(private activatedRoute: ActivatedRoute,
                     private renderer: Renderer2,
                     private canvas: CanvasService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        tap(data => console.log(data))
      )
      .subscribe(res => this.artboard = res.artboard);
  }

  ngAfterViewInit(): void {
    this.canvas.createArtboard(this.workspace.nativeElement, this.artboard);
    this.canvas.render();
  }
}
