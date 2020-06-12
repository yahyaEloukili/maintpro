import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkcorrect',
  templateUrl: './checkcorrect.component.html',
  styleUrls: ['./checkcorrect.component.scss'],
})
export class CheckcorrectComponent implements OnInit {
  @Input() idcheck;
  @Input() ischecked?: boolean;
  @Input() formArraycheck: FormControl;
  constructor() { }

  ngOnInit() {
    if (this.formArraycheck) {
      this.ischecked = this.formArraycheck.value;
    }
  }

  checked($event: Event) {
    // @ts-ignore
    this.formArraycheck.setValue($event.target.checked);
    // @ts-ignore
    this.ischecked = $event.target.checked;
  }
}
