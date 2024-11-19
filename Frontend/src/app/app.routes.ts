import { Routes } from '@angular/router';
import { ResourceAvlComponent } from './Pages/responder/resource-avl/resource-avl.component';
import { IncidentDisplayComponent } from './Pages/responder/incident-display/incident-display.component';
import { UpdateIncidentComponent } from './Pages/victim/update-incident/update-incident.component';
import { ResourceAllocationComponent } from './Pages/responder/resource-allocation/resource-allocation.component';
import { ResourceAllocationFormComponent } from './Pages/responder/resource-allocation-form/resource-allocation-form.component';
import { SubmissionSuccessComponent } from './Pages/victim/submission-success/submission-success.component';
import { AddIncidentComponent } from './Pages/victim/add-incident/add-incident.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home/home.component';
import { LoginSignupComponent } from './Pages/login-signup/login-signup.component';
import { ResourceAllocationUpdateComponent } from './Pages/responder/resource-allocation-update/resource-allocation-update.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'login-signup', component: LoginSignupComponent },

  // for the victim
  { path: 'app-add-incident', component: AddIncidentComponent, canActivate: [AuthGuard] },
  { path: 'submission-success', component: SubmissionSuccessComponent, canActivate: [AuthGuard] },
  { path: 'app-update-incident', component: UpdateIncidentComponent, canActivate: [AuthGuard] },  

  //for the responder
  { path: 'app-incident-display', component: IncidentDisplayComponent, canActivate: [AuthGuard] },
  { path: 'app-resource-avl', component: ResourceAvlComponent, canActivate: [AuthGuard] },
  { path: 'app-resource-allocation', component: ResourceAllocationComponent, canActivate: [AuthGuard] },
  { path: 'app-resource-allocation-form/:incidentId', component: ResourceAllocationFormComponent, canActivate: [AuthGuard] },
  {path: 'app-resource-allocation-update', component: ResourceAllocationUpdateComponent, canActivate: [AuthGuard]  },

];

