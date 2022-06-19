import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { DataService } from "src/app/main/services/data.service";


@Injectable({ providedIn: 'root' })
export class UniqueContractByNameAndNumberOfPlayersValidator implements AsyncValidator {
  
  constructor(private _dataService: DataService) {}

  validate(group: AbstractControl): Observable<ValidationErrors | null> {
    let numberOfPlayersControl: AbstractControl|null = group.get('numberOfPlayers');
    let nameControl: AbstractControl|null = group.get('name');
    return this._dataService.contractExistsByNameAndNumberOfPlayers(nameControl?.value, numberOfPlayersControl?.value).pipe(
      map(contractExists => (contractExists ? { uniqueContract: true } : null)),
      catchError(() => of(null))
    );
  }
}