import { Component, OnInit, inject } from '@angular/core';
import { VictimService } from '../../../service/victim/victim.service';

@Component({
  selector: 'app-incident-display',
  standalone: true,
  imports: [],
  templateUrl: './incident-display.component.html',
  styleUrl: './incident-display.component.css'
})
export class IncidentDisplayComponent implements OnInit{
    incidentdisplayService = inject(VictimService) 
    incidentList: any[] = []; 
    ngOnInit(): void { 
    this.loadResources(); 
    } 
    loadResources() { 
    this.incidentdisplayService.GetIncident().subscribe((res: any) => { 
    this.incidentList = res; 
    console.log(this.incidentList);
    });
    } 
  }


