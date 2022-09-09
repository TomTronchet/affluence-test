import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AffluenceService } from '../core-service/services/affluence.service';

@Component({
  selector: 'app-affluence-form',
  templateUrl: './affluence-form.component.html',
  styleUrls: ['./affluence-form.component.css']
})
export class AffluenceFormComponent {
  form: FormGroup;
  @Input('date') date:Date;

  // true is form submit, false if not
  @Output('backEvent') backEvent:EventEmitter<boolean> = new EventEmitter();;

  constructor(private _fb: FormBuilder, private affluenceService: AffluenceService) {
    this.form = this._fb.group({
      firstName:[null, Validators.compose([Validators.required, Validators.maxLength(50)])], 
      lastName:[null,Validators.compose([Validators.required, Validators.maxLength(50)])], 
      email:[null, Validators.compose([Validators.required, Validators.email])], 
      tel:[null],
      acceptTerm:[false, Validators.requiredTrue],
      saveInfo:[false],
    });
    let existingUser = this.affluenceService.getUser();
    if (existingUser) {
      this.form.reset(existingUser);
    }
  }

  onSave() {
    if (this.form.get('saveInfo').value) {
      this.affluenceService.setUser(this.form.value)
    }
    this.backEvent.emit(true);
  }

  onBack() {
    this.backEvent.emit(false);
  }
}
