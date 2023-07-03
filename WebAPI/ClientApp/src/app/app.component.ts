import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthenticationService
  ) { }
  title = 'app';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.checkUserAuthentificatedStatus();
  }
}
