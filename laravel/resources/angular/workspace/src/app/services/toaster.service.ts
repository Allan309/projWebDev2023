import { Injectable } from '@angular/core';
import {
	MatSnackBar,
	MatSnackBarConfig,
	MatSnackBarDismiss,
} from '@angular/material/snack-bar';
import {
	BehaviorSubject,
	delay,
	filter,
	map,
	Observable,
	of,
	Subject,
	switchMap,
	take,
	takeUntil,
	tap,
} from 'rxjs';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

export interface SnackBarQueueItem {
	message: string;
	beingDispatched: boolean;
	configParams?: MatSnackBarConfig;
	color: string;
}

@Injectable({
	providedIn: 'root',
})
export class ToasterService {
	private readonly snackBarQueue = new BehaviorSubject<SnackBarQueueItem[]>(
		[]
	);
	private readonly snackBarQueue$ = this.snackBarQueue.asObservable();
	private readonly ngDestroy = new Subject();

	constructor(private matSnackBar: MatSnackBar) {
		this.snackBarQueue$
			.pipe(
				filter(
					(queue) => queue.length > 0 && !queue[0].beingDispatched
				),
				tap(() => {
					const updatedQueue = this.snackBarQueue.value;
					updatedQueue[0].beingDispatched = true;
					this.snackBarQueue.next(updatedQueue);
				}),
				map((queue) => queue[0]),
				takeUntil(this.ngDestroy)
			)
			.subscribe((snackBarItem) =>
				this.showSnackbar(
					snackBarItem.message,
					snackBarItem.color,
					snackBarItem.configParams,
				)
			);
	}

	$getQueueLength(): Observable<number> {
		return this.snackBarQueue$.pipe(switchMap((e) => {
			return of(e.length)
		}))
	}

	public ngOnDestroy() {
		this.snackBarQueue.next([]);
		this.snackBarQueue.complete();
		this.ngDestroy.next(true);
		this.ngDestroy.complete();
	}

	public queueSnackBar(message: string, color: string = 'red', configParams?: MatSnackBarConfig) {
		this.snackBarQueue.next(
			this.snackBarQueue.value.concat([
				{ message, color, configParams, beingDispatched: false },
			])
		);
	}

	private showSnackbar(message: string, type: string, configParams?: MatSnackBarConfig) {
		if (configParams) {
			configParams.data = { message, type };
		} else {
			configParams = { data: { message, type } };
		}
		if (!configParams?.duration) {
			configParams.duration = 10000;
		}
		if (!configParams?.horizontalPosition) {
			configParams.horizontalPosition = 'end';
		}
		if (!configParams?.verticalPosition) {
			configParams.verticalPosition = 'bottom';
		}
		configParams.data.duration = configParams.duration;
		this.removeDismissedSnackBar(
			this.matSnackBar
				.openFromComponent(SnackbarComponent, configParams)
				.afterDismissed()
		);
	}

	private removeDismissedSnackBar(dismissed: Observable<MatSnackBarDismiss>) {
		dismissed.pipe(delay(100), take(1)).subscribe(() => {
			const updatedQueue = this.snackBarQueue.value;
			if (updatedQueue[0].beingDispatched) updatedQueue.shift();
			this.snackBarQueue.next(updatedQueue);
		});
	}
}
