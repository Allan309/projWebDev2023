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
import { User } from 'src/app/models/User';
import { AdService } from 'src/app/services/ad.service';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-gestAdmin',
	templateUrl: 'gestAdmin.component.html',
	styleUrls: ['gestAdmin.component.scss'],
})
export class GestAdminComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];
	assetsUrl = environment.assetsUrl;
	users: User[] = [];

	constructor(private adminService: AdminService, private toasterService: ToasterService, private router: Router) {}

	ngOnInit() {
		this.adminService.getUsers().subscribe(_ => {
			this.users = _;
			
		})
	}

	ngOnDestroy(): void {
		this.subs.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	updateRole(user: User) {
		this.adminService.updateUser(user.id, user.role_id).subscribe(_ => {
			this.toasterService.queueSnackBar("Utilistateur modifié", "success");
		})
	}

	deleteUser(id: number) {
		this.adminService.deleteUser(id).subscribe(_ => {
			this.toasterService.queueSnackBar("Utilistateur supprimé", "success");
		})
	}
}