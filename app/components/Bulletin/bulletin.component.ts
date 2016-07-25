import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {BulletinService} from '../../services/bulletin.service';

@Component({
	selector: 'daily-bulletin',
	templateUrl: 'app/components/Bulletin/bulletin.html',
	styleUrls: ['dist/app/components/Bulletin/bulletin.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [BulletinService]
})
export class BulletinComponent {
	constructor(private bulletinService: BulletinService) {}

	bulletins:string[];
	bulletinURL:string;

	ngOnInit() {
		this.bulletinService.listBulletins().subscribe(
			bulletins => {
				this.bulletins = bulletins.bulletins;
				this.bulletinURL = bulletins.baseURL + '/' + this.bulletins[0];
			},
			error => {
				console.log('Bulletin error', error);
			}
		)
	}
}
