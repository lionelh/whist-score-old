import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Contract } from 'src/app/main/data/contract';
import { ResultVO } from 'src/app/main/data/resultVO';
import { RoleScore } from 'src/app/main/data/role-scoreVO';
import { DataService } from 'src/app/main/services/data.service';
import { NavigationNotifierService } from 'src/app/main/services/navigation-notification.service';

@Component({
  selector: 'wsw-result-management',
  templateUrl: './result-management.component.html',
  styleUrls: ['./result-management.component.css']
})
export class ResultManagementComponent {
  results$: Observable<ResultVO[]>|undefined;
  contracts: Contract[];
  creationForm: FormGroup;
  roleScoresArray: string[];
  oldContractValue: number = -1;

  constructor(private _navigationNotifierService: NavigationNotifierService, private _dataService: DataService, private _fb: FormBuilder) {
    this.contracts = [];
    this.roleScoresArray = [];
    this.creationForm = this._fb.group({
      name: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(150) ], [] ],
      contract: ['', [ Validators.required ]],
    }, { validators: [], asyncValidators: [] });
  }

  get name() { return this.creationForm?.get('name'); }
  get contract() { return this.creationForm?.get('contract'); }
  get roleScores() { return this.creationForm.get('roleScores'); }

  ngOnInit(): void {
    this._navigationNotifierService.announcePageChange('results');
    this.results$ = this._dataService.findallResults();
    this._dataService.findAllContracts().subscribe(
      (data) => {
        this.contracts = data;
      },
      () => {
        this.contracts = [];
      }
    );
  }

  onSubmit(): void {
    if (this.creationForm.valid) {
      let result: ResultVO = {};
      result.name = this.name?.value;
      result.roleScores = [];
      this.contracts.forEach(ctr => {
        if (this.contract?.value ==  ctr.id) {
          result.contract = ctr;
          result.numberOfPlayers = ctr.numberOfPlayers;
          ctr.roles?.forEach(role => {
            let rs: RoleScore = {roleName: role.name, score: this.creationForm.get(role.name)?.value };
            result.roleScores?.push(rs);
          });
        }
      });
      this._dataService.createResult(result).subscribe(
        (data) => {
          this.results$ = this._dataService.findallResults();
          this.creationForm.reset();
          this.oldContractValue = -1;
          this.roleScoresArray = [];
        }
      );
    }
  }

  onContractChange(): void {
    // first remove old controls (if needed)
    if (this.oldContractValue != -1) {
      this.contracts.forEach(ctr => {
        if (this.oldContractValue ==  ctr.id) {
          ctr.roles?.forEach(role => {
            this.creationForm.removeControl(role.name);
          });
        }
      });
    }
    this.roleScoresArray = [];
    // Second add new controls
    let contractId: number = this.contract?.value;
    this.contracts.forEach(ctr => {
      if (contractId ==  ctr.id) {
        ctr.roles?.forEach(role => {
          this.creationForm.addControl(role.name, new FormControl('0'));
          this.roleScoresArray.push(role.name);
        });
      }
    });
    this.oldContractValue = contractId;
  }
}