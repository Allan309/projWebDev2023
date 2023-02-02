import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenUser } from '../models/TokenUser';
import { filterNullOrUndefined } from '../utils/filterNullOrUndefined';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenUser: TokenUser | null = null;

  private $tokenUser: BehaviorSubject<TokenUser | undefined> =
    new BehaviorSubject<TokenUser | undefined>(undefined);
    public $getTokenUser(): Observable<TokenUser | undefined> {
      return this.$tokenUser.asObservable();
    }
    public getTokenUser(): TokenUser | undefined {
      return this.$tokenUser.value;
    }
  public setTokenUser(tokenUser: TokenUser) {
    this.$tokenUser.next(tokenUser);
  }

  constructor(private http: HttpClient,
		private toasterService: ToasterService,
		private router: Router) {
      var lsUser = localStorage.getItem("USER");
      if(lsUser) {
        this.$tokenUser.next(JSON.parse(lsUser));
      }
    }

  logout() {
    return this.http.get(environment.apiBaseUrl + "/logout").pipe(tap((_) => {
				this.$tokenUser.next(undefined);
				localStorage.removeItem('USER');

				this.router.navigate(['/auth']);
				this.toasterService.queueSnackBar(
					'Vous êtes déconnecté',
					'success'
				);
    }));
  }

  login(formValue: any): Observable<any> {
    return this.http.post<TokenUser>(environment.apiBaseUrl + "/login", formValue).pipe(tap((_: TokenUser) => {
				this.$tokenUser.next(_);
				localStorage.setItem('USER', JSON.stringify(_));

				this.router.navigate(['/']);
				this.toasterService.queueSnackBar(
					'Vous êtes connecté',
					'success'
				);
    }));
  }

  register(formValue: any): Observable<any> {
    return this.http.post(environment.apiBaseUrl +"/register", formValue);
  }
}