import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/localStorage.service';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private storage: LocalStorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.auth.user.value;

    const userUser = this.storage.getUser();

    if (userUser) {
      this.router.navigate(['/sleep']);
      return false;
    }
    return true;
  }
}
