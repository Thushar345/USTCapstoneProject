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

  loadResources(): void {
    this.allocateService.GetAllocate().subscribe(
      (res: any[]) => {
        this.allocateList = res.sort((a, b) => b.allocationId - a.allocationId); // Sort by allocationId descending
        console.log('Loaded resources:', this.allocateList);
      },
      (error) => {
        console.error('Failed to load resources:', error);
      }
    );
  }
  
  updateResource(updatedData: any): void {
    const allocationId = updatedData.allocationId;
  
    if (!allocationId) {
      console.error('Allocation ID is missing in the updated data.');
      return;
    }
  
    this.allocateService.UpdateAllocate(allocationId, updatedData).subscribe(
      (response) => {
        console.log('Update successful:', response);
        this.loadResources(); // Reload resources after a successful update
      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }
  
  
  constructor(private router: Router) {}
  
  allocateResource(item: any) {
    this.router.navigate(['app-resource-allocation-update'], { state: { incident: item } });
  }
  
}
