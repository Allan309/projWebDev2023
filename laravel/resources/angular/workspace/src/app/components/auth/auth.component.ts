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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { NgxImageCompressService, DataUrl } from 'ngx-image-compress';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { b64toBlob } from 'src/app/utils/b64toBlob';

@Component({
	selector: 'app-auth',
	templateUrl: 'auth.component.html',
	styleUrls: ['auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];

	constructor(private authService: AuthService) { }

	ngOnInit() { }

	ngOnDestroy(): void {
		this.subs.forEach((sub) => {
			sub.unsubscribe();
		});
	}
}
