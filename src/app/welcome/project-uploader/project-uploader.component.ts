import {Component, HostBinding, HostListener} from '@angular/core';
import {ProjectCreatorService} from '../project-creator.service';

@Component({
  selector: 'project-uploader',
  templateUrl: './project-uploader.template.html',
  styleUrls: ['./project-uploader.styles.scss']
})
export class ProjectUploaderComponent {
  @HostBinding('class') private class: string;

  constructor(private creator: ProjectCreatorService) {

  }

  @HostListener('dragover', ['$event']) private onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();

    this.class = 'dragover';
  }

  @HostListener('dragleave', ['$event']) private onDragLeave(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();

    this.class = null;
  }

  @HostListener('drop', ['$event']) private onDrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();

    let files = evt.dataTransfer.files;

    if (files.length > 0) {
      if(this.creator.isValidFile(files[0])) {
        this.creator.showCreator(files[0]);
      }
    }

    this.class = null;
  }
}
