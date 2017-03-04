import { Component, ViewChild, OnInit } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';

@Component({
	selector: 'mymicds-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

	@ViewChild('editor')
	editor;

	client: any = deepstream('localhost:6020').login();
	notesRecord: any = this.client.record.getRecord('notes');

	private _text = '';

	get text() {
		return this._text;
	}

	set text(value) {
		this.notesRecord.set('text', value);
	}

	constructor() { }

	ngOnInit() {
		this.notesRecord.subscribe('text', value => {
			this._text = value;
			this.resizeEditor();
		});
	}

	resizeEditor() {
		while (this.editor.nativeElement.scrollHeight !== this.editor.nativeElement.offsetHeight) {
			this.editor.nativeElement.style.height = this.editor.nativeElement.scrollHeight + 'px';
		}
	}

}
