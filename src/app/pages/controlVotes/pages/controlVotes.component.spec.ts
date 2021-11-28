import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlVotesComponent } from './controlVotes.component';

describe('ControlVotesComponent', () => {
  let component: ControlVotesComponent;
  let fixture: ComponentFixture<ControlVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlVotesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
