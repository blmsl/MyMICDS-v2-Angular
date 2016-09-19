import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { capitalize } from '../../common/utils';

import { UserService } from '../../services/user.service';

@Component({
	selector: 'mymicds-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	constructor(private router: Router, private titleService: Title, private userService: UserService) { }

	ngOnInit() {
		/** @TODO: Use import { ActivatedRoute } from '@angular/router'; to get custom title if any */
		// Subscribe to router events to change title
		this.router.events.subscribe((event: any) => {
			if (typeof event.urlAfterRedirects === 'string') {
				this.titleService.setTitle('MyMICDS - ' + capitalize(event.urlAfterRedirects, 1));
			}
		});
	}

}