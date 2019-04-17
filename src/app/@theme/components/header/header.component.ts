import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { environment } from '../../../../environments/environment';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ApiService } from '../../../services/helper/api.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  public userEnv;
  public tokenEnv;

  userMenu = [{ title: 'Log out' }]; tag = 'my-context-menu';

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private _http: HttpClient,
              private _service: ApiService,
              private _router: Router) {
  }

  ngOnInit() {

    if (!this._service.checkToken()) this._router.navigate(['pages/umac/login']);
    this.userEnv = JSON.parse(localStorage.getItem("user"));
    if ((this.userEnv == null) || (typeof(this.userEnv) == 'undefined')) this.userEnv = { username: "" };
    this.tokenEnv = localStorage.getItem("token");
    this.user = { name: this.userEnv.username, picture: 'assets/images/ucare-admin.png' };
    //this.userService.getUsers().subscribe((users: any) => this.user = users.admin);
    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    })
  }

  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      this._router.navigate(['pages/umac/login']);
    } else if ( title === 'Profile' ) {
      // Do something on Profile
      console.log('Profile Clicked ')
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

}
