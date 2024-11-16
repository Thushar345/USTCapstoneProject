import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAvlComponent } from './resource-avl.component';

describe('ResourceAvlComponent', () => {
  let component: ResourceAvlComponent;
  let fixture: ComponentFixture<ResourceAvlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceAvlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceAvlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
