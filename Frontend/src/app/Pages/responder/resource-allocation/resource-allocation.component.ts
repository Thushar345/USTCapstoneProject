import { Component, inject } from '@angular/core';
import { AllocateService } from '../../../service/allocate.service';

@Component({
  selector: 'app-resource-allocation',
  standalone: true,
  imports: [],
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
