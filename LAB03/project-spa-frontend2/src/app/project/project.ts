import { Component } from '@angular/core';
import { ProjectService } from '../services/project'; 

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  projects:any;

  constructor(private projectService:ProjectService){}
  ngOnInit():void{
    this.getProjects();
  }

  getProjects():void{
    this.projectService.getprojects().subscribe(data=>{
      this.projects=data;
    })
  }
}