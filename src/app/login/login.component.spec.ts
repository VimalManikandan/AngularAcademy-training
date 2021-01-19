import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { appRouts } from '../app-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import {Location} from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router:Router;
  let location: Location;


  beforeEach(async () => {

 TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRouts)],
      
      declarations: [LoginComponent],

      providers: [LoginService]

    });
    router= TestBed.inject(Router) as Router;
    location=TestBed.inject(Location) as Location;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should loginCheck Success', waitForAsync(inject([LoginService], (loginSrvc: LoginService) => {
     expect(loginSrvc.checkLogin('User1', 'pwd123')).not.toBeUndefined();
  })));

  it('should loginCheck Failed', waitForAsync(inject([LoginService], (loginSrvc: LoginService) => {
    expect(loginSrvc.checkLogin('User', 'pwd123')).toBeUndefined();
    expect(component.errorMessgae).toBeUndefined();
  })));

  it('should loginCheck error messgae', waitForAsync(inject([LoginService], (loginSrvc: LoginService) => {
    expect(loginSrvc.checkLogin('User', 'pwd123')).toBeUndefined();
  })));



  it('should create ', () => { 
    expect(component).toBeDefined();
  });

  it('checking component login function', fakeAsync(() => { 
    component.loginCheck();
    tick(); 
    expect(component.errorMessgae).toBeDefined();
 }));



});
