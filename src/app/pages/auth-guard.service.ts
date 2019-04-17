import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  
  // you would usually put this in it's own service and not access it directly!
  // this is just for the sake of the demo.
  isLoggedIn: boolean = false;

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

  	var permission = (JSON.parse(localStorage.getItem("permission")));
	if ((permission == null) || (typeof(permission) == 'undefined')) permission = { umac: { find: { enabled : true } } };
	for (var module in permission) {
	    if (permission.hasOwnProperty(module)) {
	        if (module.search((state.url.split('/')[4])) >= 0)
	        {
	        	return permission[module]['find']['enabled'];
	        }
	    }
	}
	alert('You do not have access to this module');
	return false;

  /*
    if (this.isLoggedIn) {
      return true;
    } else {
      alert('Please log in')
      this.router.navigate(['']);
      return false;
    }

    */

  }

}