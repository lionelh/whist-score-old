import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationNotifierService {

  // Observable string sources
  private navigationActivatedSource = new Subject<string>();

  // Observable string streams
  navigationActivated$ = this.navigationActivatedSource.asObservable();

  // Service message commands
  announcePageChange(newPage: string) {
    this.navigationActivatedSource.next(newPage);
  }
}
