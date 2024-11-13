import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAllocationFormComponent } from './resource-allocation-form.component';

describe('ResourceAllocationFormComponent', () => {
  let component: ResourceAllocationFormComponent;
  let fixture: ComponentFixture<ResourceAllocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceAllocationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceAllocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
