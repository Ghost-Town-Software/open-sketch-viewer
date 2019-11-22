import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {DebugService} from '../../services/debug.service';

@Component({
  selector: 'debug',
  templateUrl: './debug.template.html',
  styleUrls: ['./debug.styles.scss'],
})
export class DebugComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', {static: true}) canvasEl;
  @Input('object-id') objectID;

  constructor(private elementRef: ElementRef, private project: ProjectService, private renderer: Renderer2,
              private debug: DebugService) {

  }

  ngOnDestroy(): void {
    // this.debug.destroy();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.debug.render(this.canvasEl.nativeElement, this.objectID);
  }
}
