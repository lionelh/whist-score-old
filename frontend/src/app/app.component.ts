import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'wsw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WhistScoreFrontend';

  constructor(private _titleService: Title) {
    this._titleService.setTitle("Whist: gestionnaire de parties");
  }
}
