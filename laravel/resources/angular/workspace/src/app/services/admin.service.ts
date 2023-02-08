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
import { Role } from '../models/Role';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

	constructor(private http: HttpClient) {}

	getUsers() {
		return this.http.get<User[]>(environment.apiBaseUrl + "/gestAdmin/users");
	}

	updateUser(id : number, role_id: number) {
		return this.http.put<User>(environment.apiBaseUrl + "/gestAdmin/setRole/"+ id, {role_id});
	}

	deleteUser(id: number): Observable<any> {
		return this.http.delete<boolean>(environment.apiBaseUrl + "/gestAdmin/"+ id);
	}
}