import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesContainerComponent } from './modules-container.component';

describe('ModulesContainerComponent', () => {
  let component: ModulesContainerComponent;
  let fixture: ComponentFixture<ModulesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
