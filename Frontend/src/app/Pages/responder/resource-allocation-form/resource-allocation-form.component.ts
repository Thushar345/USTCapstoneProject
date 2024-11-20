import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResourceService } from '../../../service/available.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../service/email.service';

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
    resourceName: "",
    quantityAllocated: 0
  };

  selectedResource: any;

  resourceService = inject(ResourceService) 
  

  resources : any[] = []

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private emailService: EmailService) {}

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
        // Fetch the resource details first
        this.http.get(`https://localhost:5000/Resources/${this.resourceAllocationObj.resourceId}`).subscribe(
          (resource: any) => {
            this.resourceAllocationObj.resourceName = resource.resourceName;
      
            // Fetch the incident details to get the location
            this.http.get(`https://localhost:5000/Incidents/${this.resourceAllocationObj.incidentId}`).subscribe(
              (incident: any) => {
                this.resourceAllocationObj.location = incident.location; // Assume `location` is a property in the incident object
                console.log('Location fetched:', this.resourceAllocationObj.location);
      
                // Proceed with posting the resource allocation
                this.http.post("https://localhost:5000/resourceallocated", this.resourceAllocationObj).subscribe(
                  (res: any) => {
                    if (res.allocationId > 0) {
                      this.decrementResourceQuantity();
      
                      // Send email notification
                      this.emailService.sendResourceAllocationEmail(
                        this.resourceAllocationObj.location,
                        this.resourceAllocationObj.resourceName,
                        this.resourceAllocationObj.quantityAllocated
                      );
                    } else {
                      alert("There was an issue creating the resource allocation record.");
                    }
                  },
                  error => {
                    console.error("Error during POST request:", error);
                    alert("Failed to create resource allocation record.");
                  }
                );
              },
              error => {
                console.error("Error fetching incident details:", error);
                alert("Failed to fetch incident details.");
              }
            );
          },
          error => {
            console.error("Error fetching resource details:", error);
            alert("Failed to fetch resource details.");
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
  
    this.http.put(`https://localhost:5000/Resources/allocate/${resourceId}`, quantity).subscribe(
      () => {
        alert("Allocated the Resource");
      },
      error => {
        console.error("Error during PUT request:", error);
        alert("Failed to decrement resource quantity.");
      }
    );
  }



  logout() {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect the user to the login page
    this.router.navigate(['/login-signup']);
  }


  
}