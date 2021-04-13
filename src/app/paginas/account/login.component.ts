import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '../../_services';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';

  import{ GlobalConstants } from '../../../common/global-constants';

  let users = JSON.parse(localStorage.getItem('users')) || [];

@Component({ templateUrl: 'login.component.html' })

export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    myControl = new FormControl();
    animalControl = new FormControl('', Validators.required);
    productores:Productor[] = [{nombre: '',codigo:''},{nombre: 'Chaparral',codigo:'01'},{nombre: 'Tombell',codigo:'02'}];
    resultadoLogIn=null;
    existeUsuario:boolean=false;
    nombreUsuario:'';
    resultado=null;
    mostrarNavBar = false;

    datoscaptura={
    productor:'',
    usuario:'',
    contrasena:''
    } 

    jLogIn ={
    productor:null,
    usuario:null,
    contrasena:null
    }

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private _snackBar: MatSnackBar
    ) {
     }
  
  
    
    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        if(this.animalControl.value['codigo']=='01'){
            GlobalConstants.apiURL="http://192.168.10.201/apiventas/"      
        }else{
            GlobalConstants.apiURL="http://192.168.11.200/apiventas/"
        }

        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value,this.animalControl.value['codigo'])
            .pipe(first())
            .subscribe(
                data => {      
                users=[];                
                if(parseInt(data["id"]) !=0 && data["id"]!==undefined){
                    users.push(data);
                    localStorage.setItem('users', JSON.stringify(users));
                    this.router.navigate([this.returnUrl]);
                }else{
                    this.ngOnInit();
                    this.loading = false;
                    this.openSnackBar();
                }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }    

    openSnackBar() {
        this._snackBar.open('USUARIO O CONTRASEÑA INCORRECTO', 'LOGIN', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
}

interface Productor {
    nombre: string;
    codigo: string;
  }
  