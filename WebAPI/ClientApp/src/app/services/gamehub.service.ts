import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamehubService {
  private hubConnection!: HubConnection;
  private apiUrl = `${environment.API_BASE_URL}`;
  constructor() { }

  connect() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.apiUrl}/gamehub`)
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('SignalR connection established');
        this.registerHandlers();
      })
      .catch(err => console.error('Error establishing SignalR connection:', err));
  }

  private registerHandlers() {
    this.hubConnection.onclose(() => {
      console.log('SignalR connection closed');
      this.onDisconnected(); // Trigger onDisconnected method when the connection is closed
    });

    this.hubConnection.on('ConnectionIdReceived', (message: string) => {
      console.log('Received ConnectionId for User: ', message);
      // Handle the received message
      localStorage.setItem('connectionId', message);
    });

    // Other event handlers can be added here
  }

  private onDisconnected() {
    // Perform any necessary actions when the SignalR connection is closed
    // For example, clear data, display a message, etc.
    localStorage.removeItem('connectionId');
  }

}
