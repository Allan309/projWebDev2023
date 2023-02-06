import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenUser } from 'src/app/models/TokenUser';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-header',
	templateUrl: 'header.component.html',
	styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];
	tokenUser?: TokenUser;
	assetsUrl = environment.assetsUrl;

	constructor(private authService: AuthService, private router: Router) {
		this.subs.push(
			this.authService.$getTokenUser().subscribe(_ => {
				this.tokenUser = _;
			})
		)
	}

	ngOnInit() {}

	ngOnDestroy(): void {
		this.subs.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	gotoProfile() {
		this.router.navigate(["user/data"])
	}
	gotoAds() {
		this.router.navigate(["ad/byUser/"+ this.tokenUser?.user.id])
	}
	gotoLogin() {
		this.router.navigate(["/auth"])
	}
	logout() {
		localStorage.removeItem('USER');
		var sub = this.authService.logout().subscribe(_ => {
			sub.unsubscribe();
		})
	}
}
