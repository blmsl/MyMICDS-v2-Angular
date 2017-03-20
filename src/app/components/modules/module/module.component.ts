import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mymicds-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ModuleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
