import { Component } from '@angular/core';
import { ProjectService } from '../services/project'; 

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class ProjectComponent {
  projects: any; // variable to store the projects data for the UI
  // Variables to hold the project data for the form temporarily while I save or update
  // Input will fields map to these variables via Forms Module
  _id!: string; // empty when creating, has value when updating
  name!: string;
  dueDate!: string;
  course!: string;

  constructor(private projectService:ProjectService){}
  ngOnInit():void{
    this.getProjects();
  }

  getProjects():void{
    this.projectService.getprojects().subscribe(data=>{
      this.projects=data;
    })
  }

  addProject(): void {
    let newProject = {
      name: this.name,
      dueDate: this.dueDate,
      course: this.course,
    };
    // Call service passing the new object data
    this.projectService.addProject(newProject).subscribe((data) => {
      this.getProjects(); // Refresh the list of projects
    });
    // Clear form fields
    this.clearForm();
  }

  deleteProject(_id: any): void {
  if (confirm('Are you sure you want to delete this project?')) {
    this.projectService.deleteProject(_id).subscribe(response => {
      this.getProjects();
    });
  }
}

  selectProject(project: any): void {
    // Project data comes from the table itself
    this._id = project._id;
    this.name = project.name;
    this.dueDate = project.dueDate;
    this.course = project.course;
  }
updateProject(): void {
    let updatedProject = {
      _id: this._id,
      name: this.name,
      dueDate: this.dueDate,
      course: this.course,
    };
    // Call service passing the updated object data
    this.projectService.updateProject(updatedProject).subscribe((data) => {
      this.getProjects(); // Refresh the list of projects
    });
    // Clear form fields
    this.clearForm();
  }

  clearForm(): void {
    this._id = '';
    this.name = '';
    this.dueDate = '';
    this.course = '';
  }




}