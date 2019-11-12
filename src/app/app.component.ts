import {Component, Injector, OnInit} from '@angular/core';
import {LoaderService} from './services/loader.service';
import {OvalComponent} from './sketch/components/oval.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'open-sketch-viewer';
  data: any;

  constructor(private loader: LoaderService) {

  }

  ngOnInit() {
    this.loader.loadDefault().subscribe((res) => {
      this.data = res;
    });
  }
}
