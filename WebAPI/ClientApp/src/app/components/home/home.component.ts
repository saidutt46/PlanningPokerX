import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateGameComponent } from '../create-game/create-game.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  actionCardList = [
    'Sign Up',
    'Create an Instant Room',
    'Invite Others',
    'Start estimation stories',
    `Well don't forget to play Poker`
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  createNewRoom() {
    this.dialog.open(CreateGameComponent, {
      width: '30%',
      height: 'auto',
      panelClass: 'custom-dialog'
    });
  }
}
