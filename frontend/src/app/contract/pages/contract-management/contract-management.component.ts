import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Role } from 'src/app/main/data/role';
import { Contract } from 'src/app/main/data/contract';
import { DataService } from 'src/app/main/services/data.service';
import { NavigationNotifierService } from 'src/app/main/services/navigation-notification.service';
import { UniqueContractByNameAndNumberOfPlayersValidator } from '../../validators/unique-contract-name-and-number-of-players.validator';

@Component({
  selector: 'wsw-contract-management',
  templateUrl: './contract-management.component.html',
  styleUrls: ['./contract-management.component.css']
})
export class ContractManagementComponent {
  contracts$: Observable<Contract[]>|undefined;
  rolesArray: Role[]|undefined;
  creationForm: FormGroup;

  constructor(private _navigationNotifierService: NavigationNotifierService, private _dataService: DataService, private _fb: FormBuilder, private _uniqueContract: UniqueContractByNameAndNumberOfPlayersValidator) {
    this.creationForm = this._fb.group({
      name: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(150) ], [ ] ],
      numberOfPlayers: ['4', [Validators.required]],
      roles: this._fb.array([], [ Validators.required ])
    }, { validators: [], asyncValidators: [ this._uniqueContract ] });
  }

  ngOnInit(): void {
    this._navigationNotifierService.announcePageChange('contracts');
    this.contracts$ = this._dataService.findAllContracts();
    this._dataService.findAllRoles().subscribe(
      (data) => {
        this.rolesArray = data;
      }
    );
  }

  get name() { return this.creationForm?.get('name'); }
  get roles() { return this.creationForm?.get('roles'); }

  findRoleById(inId: number): Role|undefined {
    let found: Role|undefined = undefined;
    this.rolesArray?.forEach((item) => {
      if (item.id == inId) {
        found = item as Role;
      }
    });
    return found;
  }

  onSubmit(): void {
    if (this.creationForm?.valid) {
      let c: Contract = { name: this.creationForm?.value['name'], numberOfPlayers: this.creationForm?.value['numberOfPlayers'], roles: [] };
      const rolesTab: FormArray = this.creationForm.get('roles') as FormArray;
      rolesTab.controls.forEach((item) => {
        let roleId: number = item.value;
        let r: Role|undefined = this.findRoleById(roleId);
        if (r !== undefined) {
          c.roles?.push(r);
        }
      });
      
      this._dataService.createContract(c).subscribe(
        () => {
          this.contracts$ = this._dataService.findAllContracts();
        }
      );
      this.creationForm.reset();
      (this.roles as FormArray).clear();
      this.creationForm.get('numberOfPlayers')?.setValue('4');
    }
  }

  onRoleCheckboxChange(e: Event) {
    let eventTarget: HTMLInputElement|null = e.target as HTMLInputElement;
    const rolesArray: FormArray = this.creationForm.get('roles') as FormArray;
    if (eventTarget.checked) {
      rolesArray.push(new FormControl(eventTarget.value));
    } else {
      let i: number = 0;
      rolesArray.controls.forEach((item) => {
        if (item.value == eventTarget?.value) {
          rolesArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}