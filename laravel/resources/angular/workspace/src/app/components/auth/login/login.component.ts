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
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];

	form: FormGroup = new FormGroup({
		email: new FormControl('allan309@mail.com', [Validators.required, Validators.email]),
		password: new FormControl('azerty123', [Validators.required, Validators.minLength(8)]),
	})

	constructor(private authService: AuthService) {}

	ngOnInit() {}

	ngOnDestroy(): void {
		this.subs.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	login() {
		if(this.form.invalid) {
			return;
		}
		this.authService.login(this.form.value).subscribe();
	}
}
