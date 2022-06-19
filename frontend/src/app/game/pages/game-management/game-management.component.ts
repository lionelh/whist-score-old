import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { Contract } from "src/app/main/data/contract";
import { DrawVO } from "src/app/main/data/drawVO";
import { Game } from "src/app/main/data/game";
import { PlayerDrawVO } from "src/app/main/data/player-drawVO";
import { ResultVO } from "src/app/main/data/resultVO";
import { Role } from "src/app/main/data/role";
import { DataService } from "src/app/main/services/data.service";

@Component({
    selector: 'wsw-game-management',
    templateUrl: './game-management.component.html',
    styleUrls: ['./game-management.component.css']
 })
 export class GameManagementComponent implements OnInit {
    id?: number;
    private sub: any;
    event: Game;
    draws$: Observable<DrawVO[]>|undefined;
    creationForm: FormGroup;
    contracts: Contract[]|undefined;
    oldContractValue: number = -1;
    playerRoleArray: string[];
    results: ResultVO[];
    roles: Role[];

    constructor(private route: ActivatedRoute, private _dataService: DataService, private _fb: FormBuilder) {
        this.playerRoleArray = [];
        this.results = [];
        this.roles = [];
        this.event = {};
        this.creationForm = this._fb.group({
            contract: [ '', [ Validators.required ], [ ], { updateOn: "blur" } ],
            result: [ '', [ Validators.required ], [ ], { updateOn: "blur" } ]
            //players: this._fb.array([], [ Validators.required ])
        });
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
            // In a real app: dispatch action to load the details here.
            this._dataService.findEventById(this.id).subscribe(
                (data: Game) => {
                    this.event = data;
                    this.id = data.id;
                    this.draws$ = this._dataService.retrieveEventDetails(this.id);
                    this._dataService.findContractsByNumberOfPlayers(data.players?.length).subscribe(
                        (ctrs: Contract[]) => {
                            this.contracts = ctrs;
                        }
                    );
                }
            );
         });
    }

    get contract() { return this.creationForm.get('contract'); }
    get result() { return this.creationForm.get('result'); }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    computeColspan(inLength: number|undefined): number {
        if (inLength !== undefined) {
            return (2 + inLength);
        } else {
            return 2;
        }
    }

    onSubmit(): void {
        if (this.creationForm?.valid) {
            let d: DrawVO = {};
            this.contracts?.forEach(ctr => {
                if (this.oldContractValue ==  ctr.id) {
                    d.contract = ctr;
                }
            });
            let resultId = this.result?.value;
            this.results?.forEach(res =>{
                if (resultId == res.id) {
                    d.result = res;
                }
            });
            d.players = [];
            this.event?.players?.forEach(p =>{
                const pdVO: PlayerDrawVO = { playerName: p.name, roleName: this.creationForm.get(p.name)?.value, eventScore: 0, drawScore: 0 };
                d.players?.push(pdVO);
            });
            this._dataService.createDraw(this.event.id, d).subscribe(
                (data: DrawVO[]) => {
                    this.creationForm.reset();
                    this.oldContractValue = -1;
                    this.playerRoleArray = [];
                    this.results = [];
                    this.roles = [];
                    this.draws$ = of(data);
                    this.event.status = "IN_PROGRESS";
                }
            );
        }
    }

    onContractChange(): void {
        // first remove old controls (if needed)
        if (this.oldContractValue != -1) {
            this.event?.players?.forEach(p => {
                this.creationForm.removeControl(p.name);
            });
        }
        this.playerRoleArray = [];
        this.results = [];
        this.roles = [];
        // Second add new controls
        let contractId: number = this.contract?.value;
        this._dataService.findResultsByContractId(contractId).subscribe(
            (data: ResultVO[]) => {
                this.results = data;
                this.contracts?.forEach(ctr => {
                    if (contractId ==  ctr.id) {
                        this.roles = ctr.roles;
                        this.event?.players?.forEach(p => {
                            this.creationForm.addControl(p.name, new FormControl(this.roles[0].id));
                            this.playerRoleArray.push(p.name);
                        });
                    }
                });
            }
        );
        this.oldContractValue = contractId;
      }

      closeEvent(inId: number|undefined) {
        this._dataService.closeEvent(inId).subscribe(
          () => {
            this.event.status = 'FINISHED';
          }
        );
      }
 }