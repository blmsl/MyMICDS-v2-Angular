import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickdayComponent } from './sickday.component';

describe('SickdayComponent', () => {
	let component: SickdayComponent;
	let fixture: ComponentFixture<SickdayComponent>;

	beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ SickdayComponent ]
	})
	.compileComponents();
	}));

	beforeEach(() => {
	fixture = TestBed.createComponent(SickdayComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();
	});

	it('should be created', () => {
	expect(component).toBeTruthy();
	});
});
