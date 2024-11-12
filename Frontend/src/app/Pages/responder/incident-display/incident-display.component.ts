import { Component, OnInit, inject } from '@angular/core';
import { VictimServiceComponent } from '../../../service/victim.service';

@Component({
  selector: 'app-incident-display',
  standalone: true,
  imports: [],
  templateUrl: './incident-display.component.html',
  styleUrl: './incident-display.component.css'
})
export class IncidentDisplayComponent implements OnInit{
    incidentdisplayService = inject(VictimServiceComponent) 
    incidentList: any[] = []; 
    ngOnInit(): void { 
    this.loadResources(); 
    } 
    loadResources() { 
    this.incidentdisplayService.GetIncidents().subscribe((res: any) => { 
    this.incidentList = res; 
    console.log(this.incidentList);
    });
    } 
  }


