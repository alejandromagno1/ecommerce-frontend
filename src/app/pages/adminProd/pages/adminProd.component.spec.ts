import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProdComponent } from './adminProd.component';

describe('AgenciesComponent', () => {
  let component: AdminProdComponent;
  let fixture: ComponentFixture<AdminProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProdComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
