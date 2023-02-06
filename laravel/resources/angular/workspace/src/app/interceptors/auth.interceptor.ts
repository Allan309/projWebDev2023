import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, empty, throwError, EMPTY } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import JWT from 'jwt-decode';
import { ToasterService } from '../services/toaster.service';
import { filterNullOrUndefined } from '../utils/filterNullOrUndefined';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private router: Router,
		private authService: AuthService,
		private toasterService: ToasterService
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		var authUser = this.authService.getTokenUser();
		let handle = next.handle(req);
		if(authUser) {
			console.log(authUser);
			if (authUser?.access_token) {
				const tokenUser: any = JWT<{}>(authUser.access_token);
				const tokenExpired =
					new Date(+tokenUser.exp * 1000) <= new Date();
				if (!tokenExpired) {
					const newHeaders = req.headers.set(
						'Authorization',
						`${authUser.token_type} ${authUser.access_token}`
					);
					const copiedReq = req.clone({ headers: newHeaders });
					handle = next.handle(copiedReq);
				} else {
					this.authService.logout();
					this.router.navigate(["/auth"]);
				}
			} else {
				handle = next.handle(req);
			}
		}
		
		return handle.pipe(
			catchError((err) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						if (authUser?.access_token) {
							const tokenUser: any = JWT(
								authUser.access_token
							);
							const tokenExpired =
								new Date(+tokenUser.exp * 1000) <=
								new Date();
							if (!tokenExpired) {
								this.router.navigate(['/auth']);
							}
						} else {
							this.router.navigate(['/auth']);
						}
						return EMPTY;
					} else if (
						err.status === 500 &&
						!!err?.error?.message
					) {
						console.error(err);
						this.toasterService.queueSnackBar(
							'Erreur: ' + err.error.message
						);
					}
				}

				this.toasterService.queueSnackBar(
					'HTTP Error: ' + err.message
				);
				return throwError(() => err);
			})
		);
	}
}
function of(arg0: Observable<HttpEvent<any>>) {
	throw new Error('Function not implemented.');
}

