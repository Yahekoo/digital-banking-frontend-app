import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerAccountsComponent } from './costumer-accounts.component';

describe('CostumerAccountsComponent', () => {
  let component: CostumerAccountsComponent;
  let fixture: ComponentFixture<CostumerAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumerAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
