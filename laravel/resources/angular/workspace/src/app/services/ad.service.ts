import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenUser } from '../models/TokenUser';
import { filterNullOrUndefined } from '../utils/filterNullOrUndefined';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';
import { Ad } from '../models/Ad';


@Injectable({
  providedIn: 'root'
})
export class AdService {

	constructor(private http: HttpClient) {}

	getList(formValue: any, byUser: number | null) {
		var url = "/ad";
		if(byUser) {
			url += "/byUser/"+ byUser;
		}
		return this.http.post<Ad[]>(environment.apiBaseUrl + url, formValue);
	}

	getById(id: number) {
		return this.http.get<Ad>(environment.apiBaseUrl + "/ad/byId/"+ id);
	}

	insertOrUpdate(formValue: any) {
		return this.http.put<Ad>(environment.apiBaseUrl + "/ad/insertOrUpdate", formValue);
	}

	addImage(image: Blob, id: number) {
		const formData = new FormData();
		formData.append('image', image);
		return this.http.post<Ad>(environment.apiBaseUrl + "/ad/addImage/"+ id, formData);
	}

	delete(id: any): Observable<any> {
		return this.http.delete<boolean>(environment.apiBaseUrl + "/ad/"+ id);
	}
}