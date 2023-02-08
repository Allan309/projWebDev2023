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
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ad } from 'src/app/models/Ad';
import { RoleEnum } from 'src/app/models/Role';
import { TokenUser } from 'src/app/models/TokenUser';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-ad-show',
	templateUrl: 'show.component.html',
	styleUrls: ['show.component.scss'],
})
export class AdShowComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];
	ad?: Ad;
	tokenUser?: TokenUser;
	isCreator = false;
	assetsUrl = environment.assetsUrl

	constructor(private authService: AuthService, private adService: AdService, private activatedRoute: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.tokenUser = this.authService.getTokenUser();
		this.subs.push(
			this.activatedRoute.params.subscribe(_ => {
				var id = +(_['id'] ?? "0");
				var sub = this.adService.getById(id).subscribe(_ => {
					this.ad = _;
					this.isCreator = this.tokenUser != undefined && (this.tokenUser?.user.id == _.user_id || this.tokenUser.user.role.id == RoleEnum.ADMINISTRATEUR)
					sub.unsubscribe();
				})
			})
		)
	}

	gotoEdit() {
		if(!this.ad || !this.tokenUser) {
			return
		}
		this.router.navigate(["/ad/"+ this.ad.id +"/edit"]);
	}

	ngOnDestroy(): void {
		this.subs.forEach((sub) => {
			sub.unsubscribe();
		});
	}
}
