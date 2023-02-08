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
import { RegisterComponent } from '../register/register.component';

@Component({
	selector: 'app-login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];

	form: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(8)]),
	})

	constructor(private authService: AuthService, public dialog: MatDialog) {}

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

	registerPopup() {
		const dialogRef = this.dialog.open(RegisterComponent, {
			width: '50vw'
		});
	
		dialogRef.afterClosed().subscribe(result => {
			if(result == null) {
				return;
			}
			this.form.get("email")?.setValue(result.email)
			this.form.get("password")?.setValue(result.password)
			this.login();
		});
	}
}