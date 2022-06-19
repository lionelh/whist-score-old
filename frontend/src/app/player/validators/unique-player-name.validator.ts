import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { DataService } from "src/app/main/services/data.service";


@Injectable({ providedIn: 'root' })
export class UniquePlayerNameValidator implements AsyncValidator {
  
  constructor(private _dataService: DataService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this._dataService.playerNameExists(control.value).pipe(
      map(nameExists => (nameExists ? { uniquePlayerName: true } : null)),
      catchError(() => of(null))
    );
  }
}