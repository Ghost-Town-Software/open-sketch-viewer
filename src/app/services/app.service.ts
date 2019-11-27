import {Injectable} from '@angular/core';
import {ElectronService} from './electron.service';
import {BehaviorSubject} from 'rxjs';
import * as path from 'path';
import * as moment from 'moment';
import * as shortid from 'shortid';
import {Config, Project} from '../model/config.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private config: Config;
  private _projects$: BehaviorSubject<Project[]>;

  get projects$() {
    return this._projects$.asObservable();
  }

  constructor(private electron: ElectronService) {
    // this.writeConfig({
    //   projects: []
    // });
    this.config = this.getConfig();
    this._projects$ = new BehaviorSubject<Project[]>(this.config.projects);
  }

  createProject(destination) {
    const project: Project = {
      id: shortid.generate(),
      path: destination,
      name: path.basename(destination),
      createdAt: moment().format()
    };

    this.config.projects.unshift(project);
    this.writeConfig(this.config);

    this._projects$.next(this.config.projects);
  }

  removeProject(project: Project) {
    this.config.projects = this.config.projects.filter(p => p.path !== project.path);
    this.writeConfig(this.config);

    this._projects$.next(this.config.projects);
  }

  private getConfig(): Config {
    const userData = this.electron.userData();
    const projects = path.join(userData, 'config.json');
    const fs = this.electron.fs;

    if (!fs.existsSync(projects)) {
      this.writeConfig({
        projects: []
      });

      return this.config;
    }

    return JSON.parse(fs.readFileSync(projects).toString());
  }

  private writeConfig(data: Config) {
    const userData = this.electron.userData();
    const projects = path.join(userData, 'config.json');
    const fs = this.electron.fs;

    fs.writeFileSync(projects, JSON.stringify(data));

    this.config = data;
  }
}
