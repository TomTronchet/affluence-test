import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core';
import { AffluenceComponent } from './affluence/affluence.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path:'',
        component: AffluenceComponent
      }
    ]
  }
];
