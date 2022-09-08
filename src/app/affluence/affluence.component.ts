import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AffluenceService } from '../core-service/services/affluence.service';

@Component({
  selector: 'app-affluence',
  templateUrl: './affluence.component.html',
  styleUrls: ['./affluence.component.css']
})
export class AffluenceComponent implements OnInit {

  dateSearch: FormControl = new FormControl(null, Validators.required);
  displayForm = false;
  constructor(private affluenceService:AffluenceService) {
  }

  ngOnInit(): void {
  }

  checkDispo() {
    this.affluenceService.getIdAvailableOnDate(1337, this.dateSearch.value).subscribe(result=>{
      if (result && result.available) {
        this.displayForm = true;
      } else {
        // print error
        this.displayForm = false;
      }
    })
  }
  onClose() {
    // save result if present (saveInfo)
    this.dateSearch.setValue(null);
    this.displayForm = false;
  }
}
