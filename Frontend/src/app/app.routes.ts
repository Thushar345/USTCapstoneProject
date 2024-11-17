import { Routes } from '@angular/router';
import { ResourceAvlComponent } from './Pages/responder/resource-avl/resource-avl.component';
import { IncidentDisplayComponent } from './Pages/responder/incident-display/incident-display.component';
import { UpdateIncidentComponent } from './Pages/victim/update-incident/update-incident.component';
import { ResourceAllocationComponent } from './Pages/responder/resource-allocation/resource-allocation.component';
import { ResourceAllocationFormComponent } from './Pages/responder/resource-allocation-form/resource-allocation-form.component';
import { SubmissionSuccessComponent } from './Pages/victim/submission-success/submission-success.component';
import { AddIncidentComponent } from './Pages/victim/add-incident/add-incident.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/home/auth/login/login.component';
import { RegisterComponent } from './Pages/home/auth/register/register.component';
import { HomeComponent } from './Pages/home/home/home.component';
import { LoginSignupComponent } from './Pages/login-signup/login-signup.component';
import { ResourceAllocationUpdateComponent } from './Pages/responder/resource-allocation-update/resource-allocation-update.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'app-login', component: LoginComponent },
  { path: 'app-register', component: RegisterComponent },
  { path: 'app-add-incident', component: AddIncidentComponent },
  { path: 'app-update-incident', component: UpdateIncidentComponent },  
  { path: 'app-incident-display', component: IncidentDisplayComponent },
  { path: 'app-resource-avl', component: ResourceAvlComponent },
  { path: 'app-resource-allocation', component: ResourceAllocationComponent },
  { path: 'app-resource-allocation-form/:incidentId', component: ResourceAllocationFormComponent },
  { path: 'submission-success', component: SubmissionSuccessComponent },
  {path: 'login-signup', component: LoginSignupComponent },
  {path: 'app-resource-allocation-update', component: ResourceAllocationUpdateComponent  },

];
//app-resource-allocation-update
