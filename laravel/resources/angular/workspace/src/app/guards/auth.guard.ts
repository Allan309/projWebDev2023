import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  /**
   * Constructor
   * @param router The router object
   */
  constructor(
    private router: Router
  ) { }
  /**
   * Can activate function
   * @param next The activated route snapshot object
   * @param state The router state snapshot object
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (
      localStorage.getItem('USER')
    ) { return true; }
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth'], {
      skipLocationChange: true
    });
    return false;
  }
}