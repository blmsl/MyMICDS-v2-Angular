import { environment } from '../../environments/environment';
import {Injectable, EventEmitter} from '@angular/core';
import {RequestOptions} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {xhrHeaders, handleError} from '../common/http-helpers';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NotesService {

	constructor(private http: AuthHttp) { }

	getClassGroups(): Observable<Array<{classStr: string, classmates: Array<Object>, oneNoteLink: string}>> {
		let body = null;
		let headers = xhrHeaders();
		let options = new RequestOptions({ headers });

		return this.http.post(environment.backendURL + '/portal/class-groups', body, options)
			.map(res => {
				let data = res.json();

				// Check if server-side error
				if (data.error) {
					throw new Error(data.error);
				}

				return data.classes;
			})
			.catch(handleError);
	}
}
