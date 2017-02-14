import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
	selector: 'mymicds-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

	@ViewChild('editor')
	editor;

	private _text: string = '';

	get text() {
		return this._text;
	}

	set text(value) {
		this._text = value;
		this.resizeEditor();
	}

	constructor() { }

	ngOnInit() {
		this.text = 'test';
	}

	resizeEditor() {
		// this.editor.nativeElement.style.height = '5px';
		while (this.editor.nativeElement.scrollHeight !== this.editor.nativeElement.offsetHeight) {
			this.editor.nativeElement.style.height = this.editor.nativeElement.scrollHeight + 'px';
		}
		// console.log(this.editor.nativeElement.style.height, this.editor.nativeElement.scrollHeight, this.editor.nativeElement.clientHeight, this.editor.nativeElement.offsetHeight);
	}

}
