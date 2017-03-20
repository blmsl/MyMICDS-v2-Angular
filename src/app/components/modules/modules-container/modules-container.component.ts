import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ModulesService } from '../../../services/modules.service';

@Component({
	selector: 'mymicds-modules-container',
	templateUrl: './modules-container.component.html',
	styleUrls: ['./modules-container.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
changeDetection: ChangeDetectionStrategy.Default
})
export class ModulesContainerComponent implements OnInit {

	moduleTypes = ['date', 'lunch', 'progress', 'schedule', 'snowday', 'stickynotes', 'weather'];
	columnsPerRow = 4;
	modulesList = []

	constructor(private modulesService: ModulesService) { }

	ngOnInit() {
		this.modulesService.getModules().subscribe(
			modules => {
				this.modulesList = modules;
				console.log(modules);
			},
			err => {
				console.log(err);
			}
		);
	}

}
