import { ServerErrorInteceptorService } from './_service/server-error-inteceptor.service';
import { LoginService } from './_service/login.service';
import { environment } from './../environments/environment';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ProfesorComponent } from './pages/profesor/profesor.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { LoginComponent } from './pages/login/login.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { Not404Component } from './pages/not404/not404.component';
import { Error500Component } from './pages/error500/error500.component';
import { Invalid401Component } from './pages/invalid401/invalid401.component';
import { LoginRealComponent } from './pages/login-real/login-real.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfesorNewComponent } from './pages/profesor/profesor-new/profesor-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfesorEliminarComponent } from './pages/profesor/profesor-eliminar/profesor-eliminar.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FotoComponent } from './pages/foto/foto.component';

export  function jwtOptionsFactory(loginService) {
  return {
    tokenGetter: async () => {
      let respuesta = loginService.estaLogueado();
      let intentos = 0;
      if(respuesta == 1 || respuesta == 2) {
        if(respuesta == 2) { 
          loginService.barraProgreso.next("1");
          
          loginService.login("tatan", "12345").subscribe(data =>{
            sessionStorage.setItem(environment.TOKEN, data);
          });

          while(true) {
           
              await delay(1000);
              respuesta = loginService.estaLogueado();
              if(respuesta == 1) {
                loginService.barraProgreso.next("2");
                break;
              }
              intentos++;
              if(intentos == 3) {
                loginService.barraProgreso.next("2");
                loginService.cerrarSesion();
                return null;
              }
          } 
        }

        let tk = sessionStorage.getItem(environment.TOKEN);
        return tk != null ? tk : '';

      } else {
        return null;
      }
    },
    allowedDomains: ["18.230.178.121:8081"],
    disallowedRoutes: ["http://18.230.178.121:8081/api/registroLogin/postIngresoLogin"]
  }
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@NgModule({
  declarations: [
    AppComponent,
    BuscarComponent,
    ProfesorComponent,
    EstudianteComponent,
    ConsultaComponent,
    LoginComponent,
    InicialComponent,
    Not404Component,
    Error500Component,
    Invalid401Component,
    LoginRealComponent,
    ProfesorNewComponent,
    ProfesorEliminarComponent,
    FotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [LoginService]
      }
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LoginService,
    { provide: HTTP_INTERCEPTORS, 
      useClass: ServerErrorInteceptorService, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

