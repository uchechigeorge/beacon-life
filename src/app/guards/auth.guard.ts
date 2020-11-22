import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomRouteService } from '../services/custom-route.service';
import { SignUpProgress, signUpRoute, completeSignUpRoute } from '../models/route-models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private customRoute: CustomRouteService,
    private router: Router,
  ) {
    this.customRoute.check();
  }

  async canActivate(): Promise<boolean | UrlTree>{
    
    const progress = await this.wait(100)
      .then(() => {
        const progress = this.customRoute.ProgressType;

        console.log(progress);
        return progress;
      });

    if(progress == SignUpProgress.None){
      this.router.navigate([`${ signUpRoute }`]);
      return false;
    }
    else if(progress !== SignUpProgress.Complete){
      this.router.navigate([`${ completeSignUpRoute }`]);
      return false;
    }
    else {
      return true;
    }
  }
  
  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));
}