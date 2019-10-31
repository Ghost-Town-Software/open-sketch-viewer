import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'project',
  styleUrls: ['./project.styles.scss'],
  templateUrl: './project.template.html'
})
export class ProjectComponent implements OnInit {
  state: any;

  constructor(private project: ProjectService) {

  }

  ngOnInit(): void {
    this.project.getState().subscribe(state => {
      this.state = state;
    })
  }
}
