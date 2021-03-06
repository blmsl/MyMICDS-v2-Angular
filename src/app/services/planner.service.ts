import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import moment from 'moment';
import { xhrHeaders, handleError } from '../common/http-helpers';
import '../common/rxjs-operators';

@Injectable()
export class PlannerService {
	constructor(private authHttp: AuthHttp) { }

	getEvents() {
		let body = JSON.stringify({});
		let headers = xhrHeaders();
		let options = new RequestOptions({ headers });

		return this.authHttp.post(environment.backendURL + '/planner/get', body, options)
			.map(res => {
				let data = res.json();

				// Check if server-side error
				if (data.error) {
					throw new Error(data.error);
				}

				// Convert possible event dates to moment.js objects
				if (data.events) {
					for (let i = 0; i < data.events.length; i++) {
						if (data.events[i].start) {
							data.events[i].start = moment(data.events[i].start);
						}
						if (data.events[i].end) {
							data.events[i].end = moment(data.events[i].end);
						}
					}
				}

				return data.events;
			})
			.catch(handleError);
	}

	addEvent(event: any) {
		let body = JSON.stringify(event);
		let headers = xhrHeaders();
		let options = new RequestOptions({ headers });

		return this.authHttp.post(environment.backendURL + '/planner/add', body, options)
			.map(res => {
				let data = res.json();

				// Check if server-side error
				if (data.error) {
					throw new Error(data.error);
				}

				return data.events;
			})
			.catch(handleError);
	}

	deleteEvent(id: string) {
		let body = JSON.stringify({ id });
		let headers = xhrHeaders();
		let options = new RequestOptions({ headers });

		return this.authHttp.post(environment.backendURL + '/planner/delete', body, options)
			.map(res => {
				let data = res.json();

				// Check if server-side error
				if (data.error) {
					throw new Error(data.error);
				}

				return;
			})
			.catch(handleError);
	}

	eventCross(id: string) {
		let body = JSON.stringify({ id });
		let headers = xhrHeaders();
		let options = new RequestOptions({ headers });

		return this.authHttp.post(environment.backendURL + '/planner/check', body, options)
			.map(res => {
				let data = res.json();

				// Check if server-side error
				if (data.error) {
					throw new Error(data.error);
				}

				return;
			})
			.catch(handleError);
	}

	eventUncross(id: string) {
		let body = JSON.stringify({ id });
		let headers = xhrHeaders();
		let options = new RequestOptions({ headers });

		return this.authHttp.post(environment.backendURL + '/planner/uncheck', body, options)
			.map(res => {
				let data = res.json();

				// Check if server-side error
				if (data.error) {
					throw new Error(data.error);
				}

				return;
			})
			.catch(handleError);
	}
}
