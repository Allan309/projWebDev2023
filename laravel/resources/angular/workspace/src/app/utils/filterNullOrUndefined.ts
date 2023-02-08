import { HttpParams } from '@angular/common/http';
import { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterNullOrUndefined<T>(): OperatorFunction<
	T | undefined | null,
	T
> {
	return (source$: Observable<T | undefined | null>) =>
		source$.pipe(
			filter((source) => {
				if (typeof source === 'undefined') {
					return false;
				}
				if (source === null) {
					return false;
				}
				if (typeof source === 'number' && isNaN(source)) {
					return false;
				}
				return true;
			})
		) as Observable<T>;
}
