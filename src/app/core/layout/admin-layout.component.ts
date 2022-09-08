import { filter } from 'rxjs/operators';
import { Component, NgZone, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


import { TranslateService } from '@ngx-translate/core';

import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { environment } from '../../../environments/environment';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  subscriptions: Subscription = new Subscription();
  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;
  currentLang = 'en';
  dir = 'ltr';
  sidePanelOpened;
  version = environment.version;
  loading = false;
  @ViewChild('sidemenu', {static: true}) sidemenu;
  @ViewChild(PerfectScrollbarDirective, {static: true}) directiveScroll: PerfectScrollbarDirective;
  public config: PerfectScrollbarConfigInterface = {};
  logo = '';

  constructor(
    private router: Router,
    public translate: TranslateService, 
    zone: NgZone) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    this.mediaMatcher.addListener(mql =>
      zone.run(() => {
        this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
      }));
  }

  ngOnInit(): void {
    let sub1 = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (document.querySelector('.app-inner > .mat-drawer-content > div')) {
        document.querySelector('.app-inner > .mat-drawer-content > div').scrollTop = 0;
      }
    });
    this.subscriptions.add(sub1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  isOver(): boolean {
      return this.mediaMatcher.matches;
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches && this.collapseSidebar) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches && this.collapseSidebar) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void {
    if (!this.mediaMatcher.matches && !this.compactSidebar) {
      setTimeout(() => {
        this.directiveScroll.update();
      }, 350);
    }
  }

}
