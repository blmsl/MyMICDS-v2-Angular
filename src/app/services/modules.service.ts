import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { xhrHeaders, handleError } from '../common/http-helpers';
import { Observable } from 'rxjs/Rx';
import '../common/rxjs-operators';

@Injectable()
export class ModulesService {
	constructor(private http: AuthHttp) { }

	getModules(): Observable<Array<Module>> {
		let body = JSON.stringify({});
		let headers = xhrHeaders();
		let options = new RequestOptions({ headers });

		return this.http.post(environment.backendURL + '/modules/get', body, options)
			.map(res => {
				let data = res.json();

				// Check if server-side error
				if (data.error) {
					throw new Error(data.error);
				}

				return data.modules;
			})
			.catch(handleError);
	}
}

interface Module {
	type: string;
	row: number;
	column: number;
	width: number;
	height: number;
	data: {
		[key: string]: any;
	}
}
