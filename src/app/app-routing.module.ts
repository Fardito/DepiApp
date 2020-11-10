import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>  redirectUnauthorizedTo(['/login']);


// Automatically log in users
const redirectLoggedInToBackup = () => redirectLoggedInTo(['/backup']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'fechas',
    loadChildren: () => import('./fechas/fechas.module').then( m => m.FechasPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./backup/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToBackup)
  },
  {
    path: 'backup',
    loadChildren: () => import('./backup/backup/backup.module').then( m => m.BackupPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
