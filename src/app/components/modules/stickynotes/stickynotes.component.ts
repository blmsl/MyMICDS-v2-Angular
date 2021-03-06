import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { StickynotesService } from '../../../services/stickynotes.service';
import { AlertService } from '../../../services/alert.service';

@Component({
	selector: 'mymicds-stickynote',
	templateUrl: './stickynotes.component.html',
	styleUrls: ['./stickynotes.component.scss']
})
export class StickynotesComponent implements OnInit {

	private _moduleId: string;
	@Input() set moduleId(id) {
		if (this._moduleId !== id) {
			this._moduleId = id;
			this.stickynotesService.get(id).subscribe(
				data => {
					this.text = data.text;
				},
				error => {
					this.alertService.addAlert('danger', 'Failed to get stickynote!', 'Please save the module layout first.');
				}
			);
		}
	};
	text: string;
	textChange: Subject<string> = new Subject();

	constructor(private stickynotesService: StickynotesService, private alertService: AlertService) { }

	ngOnInit() {
		this.textChange.debounceTime(1000).subscribe(
			text => {
				console.log('submitted');
				this.stickynotesService.post(text, this._moduleId).subscribe(
					success => {
						console.log(success);
					},
					error => {
						console.log('fuk');
					}
				);
			}
		);
	}

}
