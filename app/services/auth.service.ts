import * as config from '../common/config';

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {xhrHeaders, handleError} from '../common/http-helpers';
import '../common/rxjs-operators';
import {LocalStorage, SessionStorage} from 'h5webstorage';

@Injectable()
export class AuthService {

    constructor(private http: Http, private authHttp: AuthHttp, private localStorage: LocalStorage, private sessionStorage: SessionStorage) {}

    login(user:string, password:string, remember:any) {
        let body = JSON.stringify({
			user,
			password,
			rembmer: !!remember
		});
        let headers = xhrHeaders();
        let options = { headers };

        return this.http.post(config.backendURL + '/auth/login', body, options)
            .map(res => {
				let data = res.json();

				// Check if server-side error
				if(data.error) {
					return handleError(data.error);
				}

				if(!remember) {
					// Store in session storage. Do not remember outside of the session!
					sessionStorage['id_token'] = data.jwt
				} else {
					// Save in local storage. Remember this outside of the session!
					localStorage['id_token'] = data.jwt
				}

				return {
					success: data.success,
					jwt: data.jwt
				};
			})
            .catch(handleError);
    }

    logout() {
        let body = JSON.stringify({});
		let headers = xhrHeaders();
        let options = { headers };

        return this.authHttp.post(config.backendURL + '/auth/logout', body, options)
        	.map(res => {
				let data = res.json();

				// Check if server-side error
				if(data.error) {
					return handleError(data.error);
				}

				// Delete JWT from the client
				sessionStorage.removeItem('id_token');
				localStorage.removeItem('id_token');

				return;
			})
        	.catch(handleError);
    }

    register(info: UserData) {
        let body = JSON.stringify(info);
		let headers = xhrHeaders();
        let options = { headers };

        return this.http.post(config.backendURL + '/auth/register', body, options)
            .map(res => {
				let data = res.json();

				// Check if server-side error
				if(data.error) {
					return handleError(data.error);
				}
				return;
			})
            .catch(handleError);
    }

	confirm(user:string, hash:string) {
		let body = JSON.stringify({ user, hash });
		let headers = xhrHeaders();
        let options = { headers };

        return this.http.post(config.backendURL + '/auth/confirm', body, options)
            .map(res => {
				let data = res.json();

				// Check if server-side error
				if(data.error) {
					return handleError(data.error);
				}
				return;
			})
            .catch(handleError);
	}

    public isLoggedIn() {
    	return (this.sessionStorage['id_token'] || this.localStorage['id_token']);
    }
}

interface UserData {
	user: string;
	password: string;
	firstName: string;
	lastName: string;
	gradYear?: number;
	teacher?: boolean;
}
