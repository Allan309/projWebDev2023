import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RoleEnum } from '../models/Role';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
	
	constructor(
		private router: Router
	) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	) {
		var lsUser = JSON.parse(localStorage.getItem("USER") ?? "");
		if (lsUser && lsUser.user.role.id != RoleEnum.ADMINISTRATEUR) { 
			this.router.navigate(['/']);
		}
		return true;
	}
}