import { Component, inject } from '@angular/core';
import { AllocateService } from '../../../service/allocate.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resource-allocation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './resource-allocation.component.html',
  styleUrl: './resource-allocation.component.css'
})
export class ResourceAllocationComponent {
  allocateService = inject(AllocateService) 
  allocateList: any[] = []; 
  ngOnInit(): void { 
  this.loadResources(); 
  } 
  loadResources() { 
  this.allocateService.GetAllocate().subscribe((res: any) => { 
  this.allocateList = res; 
  console.log(this.allocateList);
  }) 
  
  } 
  
 } 
