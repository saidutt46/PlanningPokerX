import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { BaseDtoResponse, GameSession } from '@models';
import { GameSessionService, NOTIFICATION_SERV_TOKEN, NotificationService } from '@services';

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
          complete: () => console.warn('Game creation completed')
        });
    }
  }

  postGameDetails(x: BaseDtoResponse<GameSession>) {
    console.warn(x);
    this.gameSession = x.payload;
  }
}
