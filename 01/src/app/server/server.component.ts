import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrl: './server.components.css',
})
export class ServerComponent {
  serverId = 10;
  serverStatus = 'online';

  constructor() {
    this.serverStatus = Math.random() > 0.6 ? 'offline' : 'online';
  }

  getServerStatus() {
    return this.serverStatus;
  }
}
