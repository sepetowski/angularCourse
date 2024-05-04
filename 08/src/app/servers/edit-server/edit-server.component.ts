import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { CanComponentDeactivate } from '../../can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.route.params.subscribe(params=>)
    this.route.queryParams.subscribe(
      (query) => (this.allowEdit = query['allowEdit'] === '1' ? true : false)
    );
    this.route.params.subscribe((params) => {
      this.server = this.serversService.getServer(Number(params['id']));
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });
  }
  canDeactivate() {
    if (!this.allowEdit) return true;

    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    )
      return confirm('Do you want to discard changes?');
    else return true;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
