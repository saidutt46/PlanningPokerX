import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

import { BaseDtoResponse, GameSession } from '@models';
import { GameSessionService, GamehubService, NOTIFICATION_SERV_TOKEN, NotificationService } from '@services';

@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.css']
})
export class GameHomeComponent implements OnInit {
  gameId!: string;
  userId = localStorage.getItem('userId') as string;
  gameSession!: GameSession;
  constructor(
    private route: ActivatedRoute,
    private gameSessionService: GameSessionService,
    @Inject(NOTIFICATION_SERV_TOKEN) public notifier: NotificationService,
    private gameHubService: GamehubService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
    });
    if (this.gameId) {
      this.gameSessionService.getGameById(this.gameId).pipe(
        catchError(err => {
            console.warn(err.error);
            console.log('Handling error locally and rethrowing it...', );
            return throwError(err);
        })).subscribe({
          next: (v: BaseDtoResponse<GameSession>) => this.postGameDetails(v),
          error: (e: BaseDtoResponse<GameSession>) => this.notifier.errorNotification(e.error),
          complete: () => this.makeit()
        });
    }
  }

  postGameDetails(x: BaseDtoResponse<GameSession>) {
    console.warn(x);
    this.gameSession = x.payload;
  }

  postUserAdded(x: Observable<any>) {
    console.warn('user joined the game');
    console.warn(x);
  }

  makeit() {
    this.gameHubService.addParticipant(this.gameId);
  }
}
