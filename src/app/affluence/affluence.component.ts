import { Component, OnDestroy } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AffluenceService } from '../core-service/services/affluence.service';

@Component({
  selector: 'app-affluence',
  templateUrl: './affluence.component.html',
  styleUrls: ['./affluence.component.css']
})
export class AffluenceComponent {

  dateSearch: FormControl = new FormControl(null, Validators.required);
  displayForm = false;
  constructor(private affluenceService:AffluenceService, private _snackBar: MatSnackBar) {
  }

  checkDispo() {
    this.affluenceService.getIdAvailableOnDate(1337, this.dateSearch.value).subscribe(result=>{
      if (result && result.available) {
        this.displayForm = true;
      } else {
        this._snackBar.open('Créneau non disponible', 'Fermer', {
          verticalPosition: 'top',
        });
        this.displayForm = false;
      }
    })
  }
  onClose(reservationSubmit) {
    this.dateSearch.setValue(null);
    this.dateSearch.markAsUntouched()
    this.displayForm = false;
    if (reservationSubmit) {
     this._snackBar.open('La Reservation a bien été enregistrée', 'Fermer', {
       verticalPosition: 'top',
     }); 
    }
  }
}
