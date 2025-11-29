import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http:HttpClient){}

  getprojects(){
    return this.http.get('http://localhost:3000/api/projects');
  }

  // Method to create a new project
  addProject(newProject: any) {
    // Make a POST request to the backend to create a new project and send the new project data
    // Two parameters: the URL to call and the data to send
    return this.http.post('http://localhost:3000/api/projects', newProject);
  }

  // Method to delete a project
  deleteProject(_id: any) {
    // Make a DELETE request to the backend to delete a project
    // The URL to call includes the project ID to delete
    return this.http.delete('http://localhost:3000/api/projects/${_id}');
  }

  updateProject(updatedProject: any) {
    // Make a PUT request to the backend to update a project and send the updated project data
    // Two parameters: the URL to call and the data to send
    return this.http.put('http://localhost:3000/api/projects', updatedProject);
  }
  
}