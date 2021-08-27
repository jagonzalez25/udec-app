import { ValidaicionesPropias } from './../../../_clase/validaiciones-propias';
import { ValidarQueSeanIgualesComponent } from './../../../_clase/validar-que-sean-iguales/validar-que-sean-iguales.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from './../../../_model/Usuario';
import { LoginService } from './../../../_service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-profesor-new',
  templateUrl: './profesor-new.component.html',
  styleUrls: ['./profesor-new.component.css']
})
export class ProfesorNewComponent implements OnInit {

  form: FormGroup;
  titulo: string;

  private id: number;
  private edicion: boolean;

  constructor(private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {   
      this.inicializarFormulario();

      this.route.params.subscribe((params: Params) =>{
          this.id = params['id'];
          this.edicion = params['id'] != null;

          if(this.edicion == false) {
              this.titulo = 'Nuevo';
          } else {
             this.titulo = 'Editar';
             this.cargarformulario();
          }

      });
  }

  inicializarFormulario() {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      'apellido': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      'correo': new FormControl('', [Validators.required, Validators.email]),
      'telefono': new FormControl('', [Validators.required, ValidaicionesPropias.validarIncialTelefono]),
      'usuario': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      'contrasena': new FormControl('', [Validators.required]),
      'contrasenaconf': new FormControl('', [Validators.required])
    }, {
      validators: ValidaicionesPropias.validarIgualdadContrasena
    });    
  }


  cargarformulario() {

    
    this.form = new FormGroup({
      'id': new FormControl(7),
      'nombre': new FormControl('Johans'),
      'apellido': new FormControl('Gonzalez'),
      'correo': new FormControl('johans@hotmail.com'),
      'telefono': new FormControl('3105647897'),
      'usuario': new FormControl('johans'),
      'contrasena': new FormControl('12345'),
      'contrasenaconf': new FormControl('')
    });   
  }

  operar() {
      
      let usuario = new Usuario();
      usuario.id = null;
      usuario.nombre = this.form.value['nombre'];
      usuario.apellido = this.form.value['apellido'];
      usuario.correo = this.form.value['email'];
      usuario.telefono = this.form.value['tel'];
      usuario.usuario = this.form.value['usuario'];
      usuario.contrasena = this.form.value['contrasena'];
      usuario.idestado = 5;
      usuario.fotoperfil = "";
      usuario.mensaje = "";
      usuario.url = "";

      if(this.edicion == false) {
        this.guardar(usuario);
      } else {
        this.editar(usuario);
      }
  }

  guardar(usuario: Usuario){
    this.loginService.barraProgreso.next("1");
    this.loginService.registroUsurio(usuario).subscribe(data =>{

      this.openSnackBar('Usuario registrado satisfactoreamente', 'Info');
      this.loginService.barraProgreso.next("2");
      this.router.navigate(['/profesor']);
    }, err =>{
        console.log(err);
        this.loginService.barraProgreso.next("2");
        this.openSnackBar('Ha ocurrido un error', 'Error');
    });
  }

  editar(usuario: Usuario){
      console.log("Estoy editando");
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
        duration: 3000
    });
  }

}
