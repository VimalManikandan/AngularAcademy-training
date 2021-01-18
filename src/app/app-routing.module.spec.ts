import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import{Location} from '@angular/common';
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import {appRouts} from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";



 describe('Routing test cases',()=>{
     let router:Router;
     let location: Location;

     beforeEach(()=>{
       TestBed.configureTestingModule({
            imports :[ RouterTestingModule.withRoutes(appRouts)],
           declarations: [AppComponent,LoginComponent]
        });
       router= TestBed.inject(Router) as Router;
       location=TestBed.inject(Location) as Location;
     });

    it('redirect to login page', fakeAsync(() => { 
        router.navigate(['']);
        tick(); 
        expect(location.path()).toBe('/login');
    }));


});