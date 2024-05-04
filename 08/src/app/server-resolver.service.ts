//resolvers are the way of gteting the data during page load, so when u vist /example such resolver will be executed and make some wokr for example fetching data from serevr and then it will render the component/page. It allways render the page, it doset decinte to render or not it just executed before page is rendered! something like middleware

import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ServersService } from './servers/servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

export const serverResolver: ResolveFn<Server> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const serevrs = inject(ServersService);
  const id = Number(route.params['id']);
  return serevrs.getServer(id);
};
