import { Routes } from '@angular/router'; // Import RouterModule and Routes
import { AddIncidentComponent } from './Pages/victim/add-incident/add-incident.component'; // Import your components
import { ResourceAvlComponent } from './Pages/responder/resource-avl/resource-avl.component';
import { IncidentDisplayComponent } from './Pages/responder/incident-display/incident-display.component';
import { UpdateIncidentComponent } from './Pages/victim/update-incident/update-incident.component';

export const routes: Routes = [
  { path: 'app-add-incident', component: AddIncidentComponent },  // Define route for AddIncidentComponent
  { path: 'app-resource-avl', component: ResourceAvlComponent },  
  { path: 'app-incident-display', component: IncidentDisplayComponent },  // Define route for ResourceAvlComponent
  { path: 'app-update-incident', component: UpdateIncidentComponent  },  // Define route for ResourceAvlComponent

];
