import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  public servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    //by derafult router.navigate is realtvie to root, so if we want to pass a realtive path we have to specife an config obcj and tell to wich page it shoudl be reative ActivatedRoute return te currentroute of this component and we use it
    //this will broke app bcs /servers/servers
    // this.router.navigate(['servers'], { relativeTo: this.route });
  }
}
