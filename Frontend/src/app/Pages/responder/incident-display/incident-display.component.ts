import { Component, OnInit, Pipe, inject } from '@angular/core';
import { VictimService } from '../../../service/victim/victim.service';
import { Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-incident-display',
  standalone: true,
  imports: [RouterModule, DatePipe],
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


    constructor(private router: Router) {}
    allocateResource(incidentid: any) {
      this.router.navigate(['/app-resource-allocation-form',incidentid]);
    }
  }


