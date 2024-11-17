import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResourceService } from '../../../service/available.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-allocation-form',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './resource-allocation-form.component.html',
  styleUrls: ['./resource-allocation-form.component.css']
})
export class ResourceAllocationFormComponent implements OnInit{
  resourceAllocationObj: any = {
    incidentId: 0,
    allocationId: 0,
    incidentType: "",
    severity: "",
    location: "",
    resourceId: 0,
    resourceName: '',
    quantityAllocated: 0
  };

  resourceService = inject(ResourceService) 

  resources : any[] = []

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeAllocate();
    this.fetchAvailableResources();
   }
  
   initializeAllocate(): void {
    this.route.paramMap.subscribe(params => {
     const id = params.get('incidentId');
     console.log(id);
  
     if (id) {
      // Assign incidentId to resourceAllocationObj
      this.resourceAllocationObj.incidentId = +id; // Convert string to number
      console.log('IncidentId:', this.resourceAllocationObj.incidentId);
    } else {
      console.error('IncidentId not found in route parameters.');
    } 
    });

   }


   fetchAvailableResources(): void {
    this.resourceService.GetResource().subscribe((res: any) => { 
      this.resources = res; 
      console.log(this.resources);
      }) 
      
      } 


   onSubmit() {
    // First call the POST API to create the resource allocation record
    this.http.post("https://localhost:7240/api/ResourceAllocated", this.resourceAllocationObj).subscribe(
      (res: any) => {
        if (res.allocationId > 0) {
          // If the POST is successful, proceed to call the PUT API
          this.decrementResourceQuantity();
        } else {
          alert("There was an issue creating the resource allocation record.");
        }
      },
      error => {
        console.error("Error during POST request:", error);
        alert("Failed to create resource allocation record.");
      }
    );
  }
  
  // Method to call the PUT API
  decrementResourceQuantity() {
    const resourceId = this.resourceAllocationObj.resourceId;
    console.log(resourceId);
    const quantity = this.resourceAllocationObj.quantityAllocated;
    console.log(quantity);
  
    if (!resourceId || quantity <= 0) {
      alert("Invalid resource ID or quantity.");
      return;
    }
  
    this.http.put(`https://localhost:7066/api/Resources/allocate/${resourceId}`, quantity).subscribe(
      () => {
        alert("Resource quantity successfully decremented.");
      },
      error => {
        console.error("Error during PUT request:", error);
        alert("Failed to decrement resource quantity.");
      }
    );
  }
  
}