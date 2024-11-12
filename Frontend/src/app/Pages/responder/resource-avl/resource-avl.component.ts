import { Component, inject, OnInit } from '@angular/core'; 
import { ResourceService } from '../../../service/available.service';
@Component({ 
 selector: 'app-resource-avl', 
 standalone: true, 
 imports: [], 
 templateUrl: './resource-avl.component.html',
 styleUrl: './resource-avl.component.css'
}) 
export class ResourceAvlComponent implements OnInit { 
 resourceService = inject(ResourceService) 
 resourceList: any[] = []; 
 ngOnInit(): void { 
 this.loadResources(); 
 } 
 loadResources() { 
 this.resourceService.GetResource().subscribe((res: any) => { 
 this.resourceList = res; 
 console.log(this.resourceList);
 }) 
 
 } 
 
} 