import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapventasexpComponent } from "../app/paginas/capventasexp/capventasexp.component";
import { CapventasnacionalComponent } from "../app/paginas/capventasnacional/capventasnacional.component";
import { RepedoctaclienteComponent } from "../app/paginas/repedoctacliente/repedoctacliente.component"
import { ReprecuperacionsemanalnacComponent } from "../app/paginas/reprecuperacionsemanalnac/reprecuperacionsemanalnac.component"
import { RepacumuladodeventasComponent } from './paginas/repacumuladodeventas/repacumuladodeventas.component';
import { CappedidosComponent } from './paginas/cappedidos/cappedidos.component'  ;
import { RepcobranzaComponent } from './paginas/repcobranza/repcobranza.component'


import { HomeComponent } from "./paginas/home";
import { AuthGuard } from "./_helpers";

const accountModule = () => import('./paginas/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path:'capventasexp', component: CapventasexpComponent, canActivate: [AuthGuard] },
  { path:'capventasnacional', component: CapventasnacionalComponent, canActivate: [AuthGuard] },
  { path:'repedoctacliente', component: RepedoctaclienteComponent, canActivate: [AuthGuard] },
  { path:'reprecuperacionsemanalnac', component: ReprecuperacionsemanalnacComponent, canActivate: [AuthGuard] },
  { path:'repacumuladodeventas', component: RepacumuladodeventasComponent, canActivate: [AuthGuard] },
  { path:'repcobranza', component:RepcobranzaComponent, canActivate: [AuthGuard] },
  { path: 'cappedidos', component: CappedidosComponent, canActivate: [AuthGuard]},
  { path: 'account', loadChildren: accountModule },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// const routes: Routes = [
// { path:'inicio', component: InicioComponent },
// { path:'login', component: LoginComponent },
// { path:'capventasexp', component: CapventasexpComponent },
// { path:'capventasnacional', component: CapventasnacionalComponent },
// { path:'repedoctacliente', component: RepedoctaclienteComponent },
// { path:'reprecuperacionsemanalnac', component: ReprecuperacionsemanalnacComponent },
// { path:'repacumuladodeventas', component: RepacumuladodeventasComponent },
// { path:'repcobranza', component:RepcobranzaComponent },
// { path: 'cappedidos', component: CappedidosComponent},
// { path: '',component:LoginComponent,pathMatch:'full'},
// { path: '**', redirectTo: '/', pathMatch: 'full' },
 


//  ];

@NgModule({
  declarations: [],
  imports: [BrowserModule,CommonModule,RouterModule.forRoot(routes),],  
  exports: [RouterModule]
})
export class AppRoutingModule { }