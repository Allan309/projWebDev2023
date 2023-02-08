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
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ad } from 'src/app/models/Ad';
import { TokenUser } from 'src/app/models/TokenUser';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-ad-list-filtre',
	templateUrl: 'filtre.component.html',
	styleUrls: ['filtre.component.scss'],
})
export class AdListFiltreComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];
	currYear = new Date().getFullYear();
	@Output() data: EventEmitter<Ad[]> = new EventEmitter<Ad[]>();
	userId = 0;

	marques = [
		"Audi",
		"BMW",
		"Ford",
		"Mazda",
		"Mercedes",
		"Porsche",
	];
	form = new FormGroup({
		marques: new FormControl(this.marques),
		yearMin: new FormControl(1899),
		yearMax: new FormControl(this.currYear),
		priceMin: new FormControl(0),
		priceMax: new FormControl(5_000_000),
		puissanceMin: new FormControl(1),
		puissanceMax: new FormControl(800),
		order: new FormControl('priceAsc'),
	})

	constructor(private authService: AuthService, private adService: AdService, private router: Router, private activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		
		this.subs.push(
			this.activatedRoute.params.subscribe(_ => {
				this.userId = +(_["user"] ?? "0");
				this.filter();
			})
		)
	}

	filter() {
		if(this.form.invalid) {
			return;
		}
		this.adService.getList(this.form.value, this.userId).subscribe(_ => {
			this.data.next(_);
		});
	}

	ngOnDestroy(): void {
		this.subs.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	dlButton() {
		this.adService.getList(this.form.value, this.userId).subscribe((_: any) => {
			const blob = new Blob([JSON.stringify(_)], {type: "application/json;charset=utf-8"});
			saveAs(blob, "ads.json");
		});
	}
}
