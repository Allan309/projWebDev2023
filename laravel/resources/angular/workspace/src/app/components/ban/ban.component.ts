import {
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-ban',
	templateUrl: 'ban.component.html',
	styleUrls: ['ban.component.scss'],
})
export class BanComponent implements OnInit, OnDestroy {
	private subs: Subscription[] = [];

	constructor(private authService: AuthService){}

	ngOnInit() {}

	ngOnDestroy(): void {
		this.subs.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	logout() {
		localStorage.removeItem('USER');
		var sub = this.authService.logout().subscribe(_ => {
			sub.unsubscribe();
		})
	}
}