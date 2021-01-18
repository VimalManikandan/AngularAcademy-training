import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { appRouts } from '../app-routing.module';
import { Loan } from '../models/Loan.model';
import { searchFilter } from '../models/searchFilter.model';
import { LoanSearchComponent } from './loan-search.component';
import { LoanService } from './loan.service';

describe('LoanSearchComponent', () => {
  let component: LoanSearchComponent;
  let fixture: ComponentFixture<LoanSearchComponent>;
  let router:Router;
  let location: Location;

  beforeEach(async () => {

    TestBed.configureTestingModule({
      declarations: [LoanSearchComponent],
      imports: [RouterTestingModule.withRoutes(appRouts)],
      providers: [LoanService]
    })
    router= TestBed.inject(Router) as Router;
    location=TestBed.inject(Location) as Location;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSearchComponent);
    component = fixture.componentInstance;
  });


 it('should addorModifyLoan', waitForAsync(inject([LoanService], (loanSrvc: LoanService) => {
    expect(loanSrvc.addOrModifyLoan(new Loan("loan1001", "Sujith", "AK", "Palakkad-Kerala", 1000, "Housing", 60))).toBeTruthy();
 })));

 it('Should Search Loan',waitForAsync(inject([LoanService], (loanSrvc: LoanService) =>{
   expect(loanSrvc.loanSearch(new searchFilter(undefined,undefined,'V'))).not.toBeUndefined();
 })));

 it('Should Search Loan',waitForAsync(inject([LoanService], (loanSrvc: LoanService) =>{
  expect(loanSrvc.loanSearch(new searchFilter(undefined,undefined,undefined))).toEqual([ ]);
})));
it('Should Search Loan',waitForAsync(inject([LoanService], (loanSrvc: LoanService) =>{
  expect(loanSrvc.loanSearch(new searchFilter(undefined,'Vimal',undefined))).not.toBeUndefined();
})));

it('Should Search Loan',waitForAsync(inject([LoanService], (loanSrvc: LoanService) =>{
  expect(loanSrvc.loanSearch(new searchFilter('loan1001',undefined,undefined))).not.toBeUndefined();
})));

 it('should create ', () => { 
  expect(component).toBeDefined();
 });

 it('should check clear function ', () => { 
  expect(component.loanNo).toBe(undefined);
  expect(component.fName).toBe(undefined);
  expect(component.loanNo).toBe(undefined);
 });

 
 it('Should Logout', fakeAsync(() => { 
   component.logingOut();
   tick(); 
   expect(location.path()).toBe('/login');
}));

it('Adding New Loan', fakeAsync(() => { 
  component.addNewLoan();
  tick(); 
  expect(location.path()).toBe('/loanDetails');
}));

it('Viewinng Loan Deatils', fakeAsync(() => { 
  let loan = new Loan("loan1004", "Libindas", "P", "Palakkad-Kerala", 1000, "Housing", 60);
  component.viewLoanDetails(loan);
  tick(); 
  expect(location.path()).toBe('/loanDetails');
}));

it('ModifyingLoan Deatils', fakeAsync(() => { 
  let loan = new Loan("loan1004", "Libindas", "P", "Palakkad-Kerala", 1000, "Housing", 60);
  component.modifyLoanDetails(loan);
  tick(); 
  expect(location.path()).toBe('/loanDetails');
}));


});

