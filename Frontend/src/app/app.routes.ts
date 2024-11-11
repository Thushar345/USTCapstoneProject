import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { AddIncidentComponent } from './Pages/add-incident/add-incident.component';


const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route for login
  { path: 'add-emp', component: AddIncidentComponent } // Route for the add-emp component
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  declarations: [LoginComponent, AddIncidentComponent],
  bootstrap: [LoginComponent] // Bootstrapping directly with the LoginComponent
})
export class AppModule { }
