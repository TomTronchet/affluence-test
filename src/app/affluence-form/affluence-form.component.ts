import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-affluence-form',
  templateUrl: './affluence-form.component.html',
  styleUrls: ['./affluence-form.component.css']
})
export class AffluenceFormComponent implements OnInit {
  form: FormGroup;

  @Input('date') date:Date;
  @Output('backEvent') backEvent = new EventEmitter();;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      firstName:[null, Validators.compose([Validators.required, Validators.maxLength(50)])], 
      lastName:[null,Validators.compose([Validators.required, Validators.maxLength(50)])], 
      email:[null, Validators.compose([Validators.required, Validators.email])], 
      tel:[null],
      acceptTerm:[false, Validators.requiredTrue],
      saveInfo:[false],
    })
  }

  ngOnInit(): void {
  }

  onSave() {
    this.backEvent.emit(true);
  }
  onBack() {
    this.form.reset();
    this.backEvent.emit(true);
  }
}
