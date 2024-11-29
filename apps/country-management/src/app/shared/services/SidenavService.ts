import { Injectable } from '@angular/core';

import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private drawerDetails!: MatDrawer;
  private drawerFilter!: MatDrawer;

  setDrawer(drawer: MatDrawer, type: string) {
    switch (type) {
      case 'details':
        this.drawerDetails = drawer;
        break;
      case 'filter':
        this.drawerFilter = drawer;
        break;
      default:
        break;
    }
  }

  open(type: string): void {
    switch (type) {
      case 'details':
        this.drawerDetails?.open();
        break;
      case 'filter':
        this.drawerFilter?.open();
        break;
      default:
        break;
    }
  }

  close(type: string): void {
    switch (type) {
      case 'details':
        this.drawerDetails?.close();
        break;
      case 'filter':
        this.drawerFilter?.close();
        break;
      default:
        break;
    }
  }

  isDrawerOpen(type: string): boolean {
    switch (type) {
      case 'details':
        return this.drawerDetails ? this.drawerDetails.opened : false;
      case 'filter':
        return this.drawerFilter ? this.drawerFilter.opened : false;
      default:
        return false;
    }
  }
}
