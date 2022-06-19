import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Role } from 'src/app/main/data/role';
import { DataService } from 'src/app/main/services/data.service';
import { NavigationNotifierService } from 'src/app/main/services/navigation-notification.service';
import { UniqueRoleNameValidator } from '../../validators/unique-role-name.validator';

@Component({
  selector: 'wsw-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent {
  roles$: Observable<Role[]>|undefined;
  creationForm: FormGroup;

  constructor(private _navigationNotifierService: NavigationNotifierService, private _dataService: DataService, private _fb: FormBuilder, private _uniqueRoleNameValidator: UniqueRoleNameValidator) {
    this.creationForm = this._fb.group({
      name: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(150) ], [ _uniqueRoleNameValidator ], { updateOn: "blur" } ],
    });
  }

  ngOnInit(): void {
    this._navigationNotifierService.announcePageChange('roles');
    this.roles$ = this._dataService.findAllRoles();
  }

  get name() { return this.creationForm?.get('name'); }

  onSubmit(): void {
    if (this.creationForm?.valid) {
      let r: Role = { name: this.creationForm?.value['name'] };
      this._dataService.createRole(r).subscribe(
        () => {
          this.roles$ = this._dataService.findAllRoles();
        }
      );
      this.creationForm.reset();
    }
  }
}