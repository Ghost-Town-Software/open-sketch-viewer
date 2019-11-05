import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Renderer2, StaticProvider,
  ViewChild
} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {CanvasService} from '../../services/canvas.service';
import {OvalComponent} from '../../sketch/components/oval.component';


@Component({
  selector: 'workspace',
  templateUrl: './workspace.template.html',
  styleUrls: ['./workspace.styles.scss']
})
export class WorkspaceComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() artboard: any;
  @ViewChild('canvas', {static: true}) canvasEl;


  constructor(private elementRef: ElementRef, private project: ProjectService, private renderer: Renderer2,
              private canvas: CanvasService, private injector: Injector) {

  }

  ngOnDestroy(): void {
    this.canvas.destroy();
  }

  ngOnInit(): void {
    console.log('artboard', this.artboard);

    const comp = this.injector.get(OvalComponent, {
      providers: [
        {
          provide: OvalComponent,
          multi: true,
          deps: []
        }
      ]
    });

    comp.value = 'b';

    const comp1 = this.injector.get(OvalComponent, {
      providers: [
        {
          provide: OvalComponent,
          multi: true,
          deps: []
        }
      ]
    });

    comp.value = 'c';

    const comp3 = this.injector.get(OvalComponent, {
      providers: [
        {
          provide: OvalComponent,
          multi: true,
          deps: []
        }
      ]
    });



    console.log('a', comp);

    // this.canvas.createArtboard(this.canvasEl.nativeElement, this.artboard);
  }

  ngAfterViewInit() {
    // this.canvas.render();
  }
}
