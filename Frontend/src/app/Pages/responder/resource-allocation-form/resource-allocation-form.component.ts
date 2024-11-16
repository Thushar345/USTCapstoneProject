import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resource-allocation-form',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './resource-allocation-form.component.html',
  styleUrls: ['./resource-allocation-form.component.css']
})
export class ResourceAllocationFormComponent {
  resourceAllocationObj: any = {
    incidentId: 0,
    allocationId: 0,
    incidentType: "",
    severity: "",
    location: "",
    resourceName: "",
    quantityAllocated: 0
  };

  http = inject(HttpClient);

  onSubmit() {
    this.http.post("https://localhost:7240/api/ResourceAllocated", this.resourceAllocationObj).subscribe((res: any) => {
      if (res.allocationId > 0) {
        alert("Resource Allocation Record Created!");
      } else {
        alert("There was an issue creating the resource allocation record");
      }
    });
  }
}