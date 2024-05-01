import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = 'No server was created';
  serverName = '';
  serverCreated = false;
  servers = ['Test', 'Test2'];

  constructor() {
    setTimeout(() => (this.allowNewServer = true), 2000);
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = `Server was created! Name is ${this.serverName}`;
    this.servers.push(this.serverName);
  }
  onUpdateServerName(event: Event) {
    const target = event.target as HTMLInputElement;
    this.serverName = target.value;
  }
}
