import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Player } from 'src/app/main/data/player';
import { DataService } from 'src/app/main/services/data.service';
import { NavigationNotifierService } from 'src/app/main/services/navigation-notification.service';
import { UniquePlayerNameValidator } from '../../validators/unique-player-name.validator';

@Component({
  selector: 'wsw-player-management',
  templateUrl: './player-management.component.html',
  styleUrls: ['./player-management.component.css']
})
export class PlayerManagementComponent {
  players$: Observable<Player[]>|undefined;
  creationForm: FormGroup;

  constructor(private _navigationNotifierService: NavigationNotifierService, private _dataService: DataService, private _fb: FormBuilder, private _uniquePlayerNameValidator: UniquePlayerNameValidator) {
    this.creationForm = this._fb.group({
      name: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(150) ], [ _uniquePlayerNameValidator ], { updateOn: "blur" } ],
    });
  }

  ngOnInit(): void {
    this._navigationNotifierService.announcePageChange('players');
    this.players$ = this._dataService.findAllPlayers();
  }

  get name() { return this.creationForm?.get('name'); }

  onSubmit(): void {
    if (this.creationForm?.valid) {
      let p: Player = {name: this.creationForm?.value['name'] };
      this._dataService.createPlayer(p).subscribe(
        () => {
          this.players$ = this._dataService.findAllPlayers();
        }
      );
      this.creationForm.reset();
    }
  }
}