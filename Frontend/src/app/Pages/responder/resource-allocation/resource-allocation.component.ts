import { Component, inject } from '@angular/core';
import { AllocateService } from '../../../service/allocate.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-resource-allocation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './resource-allocation.component.html',
  styleUrl: './resource-allocation.component.css'
})
export class ResourceAllocationComponent {
  allocateService = inject(AllocateService);
  allocateList: any[] = [];

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources() {
    this.allocateService.GetAllocate().subscribe((res: any) => {
      this.allocateList = res;
      console.log(this.allocateList);
    });
  }
  updateResource(updatedData: any) {
    const allocationId = updatedData.allocationId;  // Extract allocationId from updatedData
  
    this.allocateService.UpdateAllocate(allocationId, updatedData).subscribe(
      (response) => {
        console.log('Update successful', response);
        // Optionally reload resources after update
        this.loadResources();
      },
      (error) => {
        console.error('Update failed', error);
      }
    );
  }
  
  constructor(private router: Router) {}
  
  allocateResource(item: any) {
    this.router.navigate(['app-resource-allocation-update'], { state: { incident: item } });
  }
  
}
