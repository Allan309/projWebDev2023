import { DatePipe } from '@angular/common';
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
import { Router } from '@angular/router';
import { DataUrl, NgxImageCompressService } from 'ngx-image-compress';
import { of, Subscription, switchMap } from 'rxjs';
import { Ad } from 'src/app/models/Ad';
import { TokenUser } from 'src/app/models/TokenUser';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';
import { b64toBlob } from 'src/app/utils/b64toBlob';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-user-edit',
	templateUrl: 'edit.component.html',
	styleUrls: ['edit.component.scss'],
	providers: [DatePipe]
})
export class UserEditComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];
	loading = false;
	currentImage?: string;
	tokenUser?: TokenUser;
	form: FormGroup = new FormGroup({})

	constructor(private toasterService: ToasterService, private router: Router, private userService: UserService, private authService: AuthService, private imageCompressService: NgxImageCompressService, private datepipe: DatePipe) {}

	ngOnInit() {
		this.tokenUser = this.authService.getTokenUser();
		this.currentImage = environment.assetsUrl + this.tokenUser?.user.url_image;
		this.form = new FormGroup({
			pseudo: new FormControl(this.tokenUser?.user.pseudo, [Validators.required, Validators.maxLength(30)]),
			email: new FormControl(this.tokenUser?.user.email, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.minLength(8)]),
			passwordConfirm: new FormControl(null, [Validators.minLength(8)]),
			nom: new FormControl(this.tokenUser?.user.nom, [Validators.required, Validators.maxLength(30)]),
			prenom: new FormControl(this.tokenUser?.user.prenom, [Validators.required, Validators.maxLength(30)]),
			nationalite: new FormControl(this.tokenUser?.user.nationalite, [Validators.required]),
			adresse: new FormControl(this.tokenUser?.user.adresse, [Validators.required, Validators.maxLength(60)]),
			tel: new FormControl(this.tokenUser?.user.tel, [Validators.required, Validators.maxLength(11)]),
			date_naissance: new FormControl(this.datepipe.transform(this.tokenUser?.user.date_naissance, 'dd/MM/yyyy'), [Validators.required]),
			image: new FormControl(null),
		})
	}

	ngOnDestroy(): void {
		this.subs.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	submit() {
		if(this.form.invalid || this.loading) {
			return;
		}
		if(this.form.get("password")?.value?.length > 0 && this.form.get("password")?.value != this.form.get("passwordConfirm")?.value) {
			return;
		}
		var formValue = this.form.value;
		if(this.form.get("password")?.value?.length == 0) {
			formValue.password = null;
			formValue.passwordConfirm = null;
		}
		formValue.image = null;
		formValue.date = formValue.date as string;
		var sub = this.userService.update(formValue).pipe(
			switchMap((user: User) => {
				if(this.form.get("image")?.value) {
					return this.userService.addImage(this.form.get("image")?.value, user.id);
				} else {
					return of(user);
				}
			}),
		).subscribe((_: User) => {
			if(this.tokenUser) {
				this.toasterService.queueSnackBar("Données modifiées");
				var newTokenUser = this.tokenUser;
				newTokenUser.user = _;
				this.authService.setTokenUser(newTokenUser)
			}
			sub.unsubscribe();
		})
	}

	deleteUser() {
		var sub = this.userService.delete(this.tokenUser?.user.id).subscribe(_ => {
			if(!_) {
				this.toasterService.queueSnackBar("Impossible de supprimer vos données");
			} else {
				this.toasterService.queueSnackBar("Compte supprimé", "success");
				this.authService.setTokenUser(undefined)
				this.router.navigate(["/auth"]);
			}
			sub.unsubscribe();
		});
	}

	async onFileSelected(event: any) {
		var file = event.target.files[0];
		if (file) {
			this.loading = true;
			var orientation = await this.imageCompressService.getOrientation(
				file
			);
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = async () => {
				this.imageCompressService
					.compressFile(reader.result + '', orientation)
					.then((result: DataUrl) => {
						this.currentImage = result;
						var img = result.replace(/data:image(.*)base64,/, '');
						var match = result.match(/data:image\/(.*);base64/);
						if (!match || match?.length <= 1) {
							return;
						}
						var ext = match[1];
						var a = b64toBlob(img, 'image/' + ext);
						this.form.get('image')?.setValue(a);
						this.loading = false;
					});
			};
		}
	}
}
