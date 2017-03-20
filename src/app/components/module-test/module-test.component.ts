import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'mymicds-module-test',
	templateUrl: './module-test.component.html',
	styleUrls: ['./module-test.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModuleTestComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
