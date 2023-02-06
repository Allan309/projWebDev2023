import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenUser } from '../models/TokenUser';
import { filterNullOrUndefined } from '../utils/filterNullOrUndefined';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';
import { Ad } from '../models/Ad';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) {}

	update(formValue: any) {
		return this.http.put<User>(environment.apiBaseUrl + "/user", formValue);
	}

	addImage(image: Blob, id: number) {
		const formData = new FormData();
		formData.append('image', image);
		
		return this.http.post<User>(environment.apiBaseUrl + "/user/addImage", formData);
	}

	delete(id: any): Observable<any> {
		return this.http.delete<boolean>(environment.apiBaseUrl + "/user");
	}
}