import { Component, OnInit, OnDestroy } from '@angular/core';

import { MyMICDSModule } from '../modules-main';

import { AlertService } from '../../../services/alert.service';
import { SnowdayService } from '../../../services/snowday.service';

@Component({
	selector: 'mymicds-snowday',
	templateUrl: './snowday.component.html',
	styleUrls: ['./snowday.component.scss']
})
@MyMICDSModule({
	name: 'snowday',
	icon: 'fa-snowflake-o',
	initHeight: 1,
	initWidth: 2
})
export class SnowdayComponent implements OnInit, OnDestroy {

	snowdayData: any = null;
	subscription: any;

	constructor(private alertService: AlertService, private snowdayService: SnowdayService) { }

	ngOnInit() {
		this.subscription = this.snowdayService.calculate().subscribe(
			data => {
				this.snowdayData = data;
			},
			error => {
				this.alertService.addAlert('danger', 'Snowday Calculator Error!', error);
			}
		);
	}

	ngOnDestroy() {
		// Unsubscribe to prevent memory leaks or something
		this.subscription.unsubscribe();
	}

}
