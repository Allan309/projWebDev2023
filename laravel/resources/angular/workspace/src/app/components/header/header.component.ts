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
import { RoleEnum } from 'src/app/models/Role';
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
	isAdmin = false;

	constructor(private authService: AuthService, private router: Router) {
		this.subs.push(
			this.authService.$getTokenUser().subscribe(_ => {
				this.tokenUser = _;
				this.isAdmin = _?.user.role.id as RoleEnum == RoleEnum.ADMINISTRATEUR
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
	gotoGestAdmin() {
		this.router.navigate(["/gestAdmin"])
	}
	logout() {
		localStorage.removeItem('USER');
		var sub = this.authService.logout().subscribe(_ => {
			sub.unsubscribe();
		})
	}
}
