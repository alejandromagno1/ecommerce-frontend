import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinesComponent } from './lines.component';

describe('AgenciesComponent', () => {
  let component: LinesComponent;
  let fixture: ComponentFixture<LinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
