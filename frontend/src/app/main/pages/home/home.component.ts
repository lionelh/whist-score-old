import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from '../../services/data.service';
import { NavigationNotifierService } from '../../services/navigation-notification.service';
import { Game } from '../../data/game';
import { Player } from '../../data/player';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wsw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events$: Observable<Game[]>|undefined;
  dbPlayers: Player[]|undefined;
  creationForm: FormGroup;

  constructor(private _navigationNotifierService: NavigationNotifierService, private _dataService: DataService, private _fb: FormBuilder) {
    this.creationForm = this._fb.group({
      place: [ '', [ Validators.required, Validators.minLength(2), Validators.maxLength(150) ], [ ], { updateOn: "blur" } ],
      players: this._fb.array([], [ Validators.required ])
    });
  }

  ngOnInit(): void {
    this._navigationNotifierService.announcePageChange('home');
    this.events$ = this._dataService.findAllEvents();
    this._dataService.findAllPlayers().subscribe(
      (data: Player[]) => {
        this.dbPlayers = data;
      }
    );
  }

  get place() { return this.creationForm.get('place'); }
  get players() { return this.creationForm.get('players'); }
  
  onSubmit(): void {
    if (this.creationForm?.valid) {
      let e: Game = { place: this.creationForm.value['place'] };
      e.players = [];
      const playersTab: FormArray = this.creationForm.get('players') as FormArray;
      playersTab.controls.forEach((item) => {
        let roleId: number = item.value;
        let p: Player|undefined = this.findPlayerById(roleId);
        if (p !== undefined) {
          e.players?.push(p);
        }
      });
      
      this._dataService.createEvent(e).subscribe(
        () => {
          this.events$ = this._dataService.findAllEvents();
        }
      );
      this.creationForm.reset();
      (this.players as FormArray).clear();
    }
  }

  findPlayerById(inId: number): Player|undefined {
    let found: Player|undefined = undefined;
    this.dbPlayers?.forEach((item) => {
      if (item.id == inId) {
        found = item as Player;
      }
    });
    return found;
  }

  onPlayerCheckboxChange(e: Event) {
    let eventTarget: HTMLInputElement|null = e.target as HTMLInputElement;
    const playersArray: FormArray = this.creationForm.get('players') as FormArray;
    if (eventTarget.checked) {
      playersArray.push(new FormControl(eventTarget.value));
    } else {
      let i: number = 0;
      playersArray.controls.forEach((item) => {
        if (item.value == eventTarget?.value) {
          playersArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  closeEvent(inId: number|undefined) {
    this._dataService.closeEvent(inId).subscribe(
      () => {
        this.events$ = this._dataService.findAllEvents();
      }
    );
  }
}