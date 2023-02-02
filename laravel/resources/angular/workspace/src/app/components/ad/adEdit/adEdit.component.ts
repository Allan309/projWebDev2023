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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataUrl, NgxImageCompressService } from 'ngx-image-compress';
import { of, Subscription, switchMap } from 'rxjs';
import { Ad } from 'src/app/models/Ad';
import { TokenUser } from 'src/app/models/TokenUser';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { b64toBlob } from 'src/app/utils/b64toBlob';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-ad-edit',
	templateUrl: 'adEdit.component.html',
	styleUrls: ['adEdit.component.scss'],
})
export class AdEditComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];
	assetsUrl = environment.assetsUrl;
	form: FormGroup = new FormGroup({});
	loading = false;
	id = 0;
	currentImage: any;
	setDeflautImage = true;

	constructor(private adService: AdService, private router: Router, private activatedRoute: ActivatedRoute, private toasterService: ToasterService, private imageCompressService: NgxImageCompressService) {
		this.initForm(null);
	}

	ngOnInit() {
		this.id = +(this.activatedRoute.snapshot.params["id"] ?? "0");

		if(this.id == 0) {
			this.setDeflautImage = true;
			this.initForm(null);
		} else {
			this.subs.push(
				this.adService.getById(this.id).subscribe((ad: Ad) => {
					this.currentImage = ad?.url_image;
					this.initForm(ad);
				})
			)
		}
	}

	private initForm(ad: Ad | null) {
		this.form = new FormGroup({
			description: new FormControl(ad?.description, [Validators.required]),
			annee: new FormControl(ad?.annee, [Validators.required, Validators.min(0)]),
			puissance: new FormControl(ad?.puissance, [Validators.required, Validators.min(0)]),
			marque: new FormControl(ad?.marque, [Validators.required, Validators.maxLength(30)]),
			modele: new FormControl(ad?.modele, [Validators.required, Validators.maxLength(50)]),
			prix: new FormControl(ad?.prix, [Validators.required, Validators.min(0)]),
			image: new FormControl(),
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
		var formValue = this.form.value;
		formValue.id = this.id;
		formValue.setDeflautImage = this.setDeflautImage;
		this.adService.insertOrUpdate(formValue).pipe(
			switchMap((ad: Ad) => {
				if(this.form.get("image")?.value) {
					return this.adService.addImage(this.form.get("image")?.value, this.id);
				} else {
					return of({} as Ad);
				}
			}),
		).subscribe((_: Ad) => {
			this.toasterService.queueSnackBar("Annonce modifiée");
			this.router.navigate(["/ad/"+ this.form.get("id")?.value])
		})
	}

	async onFileSelected(event: any) {
		this.setDeflautImage = false;
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

	deleteAd() {
		var sub = this.adService.delete(this.id).subscribe(_ => {
			if(!_) {
				this.toasterService.queueSnackBar("Impossible de supprimer l'annonce");
			} else {
				this.toasterService.queueSnackBar("Annonce supprimée", "success");
				this.router.navigate(["/ad"]);
			}
			sub.unsubscribe();
		});
	}
}
