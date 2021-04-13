import { Component,Input,OnInit } from '@angular/core';
import { AccountService } from './_services';
import { User } from './_models';
import { Router, ActivatedRoute } from '@angular/router';
import{ GlobalConstants } from '../common/global-constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{

  title = 'ventas';
  user: User;
  empresas = "";
  constructor(private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.accountService.user.subscribe(x => this.user = x);
      this.user = this.accountService.userValue;
  }

  buscarProductores(pEmpresa,pCodigo){
    this.empresas= pEmpresa;
    if(pCodigo=='01'){
      GlobalConstants.apiURL="http://192.168.10.201/apiventas/"      
  }else{
      GlobalConstants.apiURL="http://192.168.11.200/apiventas/"
  }
    // reiniciar componente actual 
    this.reloadComponent();
    
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  logout() {
    this.accountService.logout();
  }

}
