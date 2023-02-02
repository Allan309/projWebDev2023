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
import { Ad } from 'src/app/models/Ad';
import { TokenUser } from 'src/app/models/TokenUser';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-ad-list',
	templateUrl: 'adList.component.html',
	styleUrls: ['adList.component.scss'],
})
export class AdListComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];
	assetsUrl = environment.assetsUrl;
	ads: Ad[] = [];

	constructor(private authService: AuthService, private adService: AdService, private router: Router) {}

	ngOnInit() {
		this.subs.push(
			this.adService.getList(this.router.url == "user/myads").subscribe(_ => {
				this.ads = _;
			})
		)
	}

	ngOnDestroy(): void {
		this.subs.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	gotoId(id: number) {
		this.router.navigate(["ad/"+ id]);
	}
}