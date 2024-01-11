import { Routes } from '@angular/router';
import { signinGuard } from './guards/signin.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/signin-page/signin-page.component').then(
        (x) => x.SigninPageComponent,
      ),
    canActivate: [signinGuard],
  },
  {
    path: 'rifa/:id',
    loadComponent: () =>
      import('./pages/rifa-page/rifa-page.component').then(
        (x) => x.RifaPageComponent,
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search-page/search-page.component').then(
        (x) => x.SearchPageComponent,
      ),
  },
  {
    path: 'profile',
    children: [
      {
        path: 'settings',
        loadComponent: () =>
          import(
            './pages/profile-page/subpages/account-configuration/account-configuration.component'
          ).then((x) => x.AccountConfigurationComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/profile-page/subpages/create/create.component').then(
            (x) => x.CreateComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full',
      },
    ],
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then(
        (x) => x.ProfilePageComponent,
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
