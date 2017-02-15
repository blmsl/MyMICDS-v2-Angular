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

	private _text: string = '';

	client: any = deepstream('localhost:6020').login();
	notesRecord: any = this.client.record.getRecord('anotherNotes');

	get text() {
		return this._text;
	}

	set text(value) {
		this._text = value;
		this.resizeEditor();
		this.notesRecord.set('note', this._text);
	}

	constructor() { }

	ngOnInit() {
		this.text = 'test';
		this.notesRecord.subscribe('note', value => {
			this._text = value;
		});
	}

	resizeEditor() {
		while (this.editor.nativeElement.scrollHeight !== this.editor.nativeElement.offsetHeight) {
			this.editor.nativeElement.style.height = this.editor.nativeElement.scrollHeight + 'px';
		}
	}

}
