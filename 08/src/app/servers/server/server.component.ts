import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params) =>
    //     (this.server = this.serversService.getServer(Number(params['id'])))
    // );
    //resolver
    this.route.data.subscribe((data) => {
      this.server = data['server'];
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
}
