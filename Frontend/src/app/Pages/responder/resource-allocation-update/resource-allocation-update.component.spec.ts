import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAllocationUpdateComponent } from './resource-allocation-update.component';

describe('ResourceAllocationUpdateComponent', () => {
  let component: ResourceAllocationUpdateComponent;
  let fixture: ComponentFixture<ResourceAllocationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceAllocationUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceAllocationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
