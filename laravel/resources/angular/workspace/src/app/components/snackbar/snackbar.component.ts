import { Component, Inject } from '@angular/core';
import {
	MatSnackBarRef,
	MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { interval, of } from 'rxjs';
import { ToasterService } from '../../services/toaster.service';

@Component({
	selector: 'ui-snackbar',
	templateUrl: 'snackbar.component.html',
	styleUrls: ['snackbar.component.scss'],
})
export class SnackbarComponent {
	public faBell = faBell;
	public $left = this.toasterService.$getQueueLength();
	public progress: number = 0;

	constructor(
		private toasterService: ToasterService,
		@Inject(MAT_SNACK_BAR_DATA)
		public data: any,
		private snackbarRef: MatSnackBarRef<SnackbarComponent>
	) {
		interval(100).subscribe((e) => {
			this.progress += 100 / (data.duration/100);
		});
	}

	onClose() {
		this.snackbarRef.dismiss();
	}
}
