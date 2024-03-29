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
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxImageCompressService, DataUrl } from 'ngx-image-compress';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { b64toBlob } from 'src/app/utils/b64toBlob';
import { matchValidator } from 'src/app/utils/validator_match';

@Component({
	selector: 'app-register',
	templateUrl: 'register.component.html',
	styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];
	loading = false;
	currentImage?: string;

	form: FormGroup = new FormGroup({
		pseudo: new FormControl('', [Validators.required, Validators.maxLength(30)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(8), matchValidator('passwordConfirm', true)]),
		passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8), matchValidator('password')]),
		nom: new FormControl('', [Validators.required, Validators.maxLength(30)]),
		prenom: new FormControl('', [Validators.required, Validators.maxLength(30)]),
		nationalite: new FormControl('', [Validators.required]),
		adresse: new FormControl('', [Validators.required, Validators.maxLength(60)]),
		tel: new FormControl('', [Validators.required, Validators.maxLength(11)]),
		date_naissance: new FormControl('', [Validators.required, Validators.pattern("[0-9]{2}\/[0-9]{2}\/[0-9]{4}")]),
		image: new FormControl(null),
	})

	constructor(private toasterService: ToasterService, private authService: AuthService, private imageCompressService: NgxImageCompressService, public dialogRef: MatDialogRef<RegisterComponent>) { }

	ngOnInit() { }

	ngOnDestroy(): void {
		this.subs.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	register() {
		if (this.form.invalid || this.loading) {
			return;
		}
		if (this.form.get("password")?.value !== this.form.get("passwordConfirm")?.value) {
			return;
		}

		this.authService.register(this.form.value).subscribe(_ => {
			this.toasterService.queueSnackBar("Vous êtes enregistré", 'success')
			this.dialogRef.close({
				email: this.form.get("email")?.value,
				password: this.form.get("password")?.value,
			});
		})
	}
}

