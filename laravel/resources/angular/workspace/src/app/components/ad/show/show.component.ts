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
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-ad-show',
	templateUrl: 'show.component.html',
	styleUrls: ['show.component.scss'],
})
export class AdShowComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];

	constructor(public dialog: MatDialog) {}

	ngOnInit() {}

	ngOnDestroy(): void {
		this.subs.forEach((sub) => {
			sub.unsubscribe();
		});
	}
}
