import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {CanvasService} from '../../services/canvas.service';
import {DebugService} from '../../services/debug.service';
import FontFaceObserver from 'fontfaceobserver';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.template.html',
  styleUrls: ['./workspace.styles.scss'],
})
export class WorkspaceComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() artboard: any;
  @ViewChild('canvas', {static: true}) canvasEl;


  constructor(private elementRef: ElementRef, private project: ProjectService, private renderer: Renderer2,
              private canvas: CanvasService) {

  }

  ngOnDestroy(): void {
    this.canvas.destroy();
  }

  ngOnInit(): void {
    console.log('FontFaceObserver', FontFaceObserver);
    console.log('artboard', this.artboard);

    this.canvas.createArtboard(this.canvasEl.nativeElement, this.artboard);
  }

  ngAfterViewInit() {
    this.canvas.render();
  }
}
