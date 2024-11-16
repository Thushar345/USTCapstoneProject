import { Component, inject, OnInit } from '@angular/core';
import { AllocateService } from '../../../service/allocate.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';  // Import Router


@Component({
  selector: 'app-resource-allocation-update',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './resource-allocation-update.component.html',
  styleUrls: ['./resource-allocation-update.component.css']
})
export class ResourceAllocationUpdateComponent implements OnInit {

  allocationObj: any = {
    allocationId: 0,
    incidentId: '',
    resourceName: '',
    quantityAllocated: 0,
    location: '',
    severity: ''
  };

  allocationList: any[] = [];
  allocateService = inject(AllocateService);

  constructor(
    private router: Router,  // Inject Router
 
  ) {}

  ngOnInit(): void {
    this.loadAllocations();
  }

  loadAllocations() {
    this.allocateService.GetAllocate().subscribe((res: any) => {
      this.allocationList = res;  // Load the allocations into the list
    });
  }

  // This method is called when the user clicks the 'Edit' button on an allocation item
  onEdit(allocation: any) {
    // Populate the form with the details of the selected allocation
    this.allocationObj = { ...allocation };
    console.log("Editing Allocation:", this.allocationObj);  // For debugging
  }

  // This method is triggered when the user submits the form to update the allocation
  onUpdate() {
    console.log(this.allocationObj);  // Log the updated data
  
    const allocationId = this.allocationObj.allocationId;  // Extract allocationId from allocationObj
  
    // Call UpdateAllocate with the allocationId and the updated data
    this.allocateService.UpdateAllocate(allocationId, this.allocationObj).subscribe(
      (res: any) => {
        if (res && res.allocationId) {
          alert("Allocation Record Updated!");
          this.loadAllocations();  // Reload allocations after update
          this.resetForm();  // Optionally reset the form after update
        } else {
          alert("Allocation success.");
          this.router.navigate(['app-resource-allocation']);
        }
      },
      (error) => {
        console.error('Error occurred:', error);  // Log error to console
        alert("Error while updating the allocation.");
      }
    );
  }

  // Reset the form after successful update
  resetForm() {
    this.allocationObj = {
      allocationId: 0,
      incidentId: '',
      resourceName: '',
      quantityAllocated: 0,
      location: '',
      severity: ''
    };
  }
}
