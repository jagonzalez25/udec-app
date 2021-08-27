import { FotoComponent } from './pages/foto/foto.component';
import { ProfesorNewComponent } from './pages/profesor/profesor-new/profesor-new.component';
import { LoginRealComponent } from './pages/login-real/login-real.component';
import { Invalid401Component } from './pages/invalid401/invalid401.component';
import { GuardianService } from './_service/guardian.service';
import { Error500Component } from './pages/error500/error500.component';
import { Not404Component } from './pages/not404/not404.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { LoginComponent } from './pages/login/login.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { ProfesorComponent } from './pages/profesor/profesor.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'buscar', component:  BuscarComponent, canActivate: [GuardianService]},
  {path: 'profesor', component:  ProfesorComponent, children: [
      { path: 'nuevo', component: ProfesorNewComponent },
      { path: 'editar/:id', component: ProfesorNewComponent }
      ],  canActivate: [GuardianService]},
  {path: 'estudiante', component:  EstudianteComponent, canActivate: [GuardianService]},
  {path: 'consulta', component: ConsultaComponent, canActivate: [GuardianService]},
  {path: 'login', component: LoginComponent},
  {path: 'loginReal', component: LoginRealComponent},
  {path: 'inicial', component: InicialComponent},
  {path: 'foto', component: FotoComponent},
  {path: '', component: InicialComponent},
  {path: 'error/:status/:statusText', component: Error500Component},
  {path: '401Invalid', component: Invalid401Component},
  {path: '**', component: Not404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
