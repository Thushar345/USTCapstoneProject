import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resource-allocation-form',
  standalone: true,
  imports: [FormsModule],
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
    debugger;
    this.http.post("http://localhost:5000/resourceallocated", this.resourceAllocationObj).subscribe((res: any) => {
      debugger;
      if (res.allocationId > 0) {
        alert("Resource Allocation Record Created!");
      } else {
        alert("There was an issue creating the resource allocation record");
      }
    });
  }
}