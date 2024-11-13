import { Routes } from '@angular/router'; 
import { AddIncidentComponent } from './Pages/victim/add-incident/add-incident.component'; 
import { ResourceAvlComponent } from './Pages/responder/resource-avl/resource-avl.component';
import { IncidentDisplayComponent } from './Pages/responder/incident-display/incident-display.component';
import { UpdateIncidentComponent } from './Pages/victim/update-incident/update-incident.component';
import { ResourceAllocationComponent } from './Pages/responder/resource-allocation/resource-allocation.component';
import { ResourceAllocationFormComponent } from './Pages/responder/resource-allocation-form/resource-allocation-form.component';

export const routes: Routes = [
  { path: 'app-add-incident', component: AddIncidentComponent },  
  { path: 'app-resource-avl', component: ResourceAvlComponent },  
  { path: 'app-incident-display', component: IncidentDisplayComponent },  
  { path: 'app-update-incident', component: UpdateIncidentComponent  }, 
  { path: 'app-resource-allocation', component: ResourceAllocationComponent },  
  { path: 'app-resource-allocation-form', component: ResourceAllocationFormComponent },  

 
];
