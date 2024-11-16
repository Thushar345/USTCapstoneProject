import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDisplayComponent } from './incident-display.component';

describe('IncidentDisplayComponent', () => {
  let component: IncidentDisplayComponent;
  let fixture: ComponentFixture<IncidentDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
