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

const AnonymousUrl: string[] = ['login', 'register'];

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
		if (AnonymousUrl.find((url) => req.url.includes(url))) {
			return next.handle(req);
		}

		var authUser = this.authService.getTokenUser();
		if(!authUser) {
			return next.handle(req);
		} else {
			return this.authService.$getTokenUser().pipe(
				filterNullOrUndefined(),
				switchMap((authUser) => {
					let handle = null;
					
					if (authUser?.access_token) {
						const tokenUser: any = JWT<{}>(authUser.access_token);
						const tokenExpired =
							new Date(+tokenUser.exp * 1000) <= new Date(); // - (new Date().getTimezoneOffset() * 60000)
						if (!tokenExpired) {
							const newHeaders = req.headers.set(
								'Authorization',
								`${authUser.token_type} ${authUser.access_token}`
							);

							const copiedReq = req.clone({ headers: newHeaders });

							handle = next.handle(copiedReq);
						} else {
							handle = next.handle(req);
						}
					} else {
						handle = next.handle(req);
					}
					let showToast = true;
					return handle.pipe(
						catchError((err) => {
							console.error(err);
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
										// TODO open login google popup
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
									showToast = false;
								}
							}

							this.toasterService.queueSnackBar(
								'HTTP Error: ' + err.message
							);
							return throwError(() => err);
						})
					);
				})
			);

		}
	}
}
