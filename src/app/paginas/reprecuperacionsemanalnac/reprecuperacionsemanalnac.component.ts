import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from "../../_services/service.service";
import { Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
declare var jQuery: any;

@Component({
  selector: 'app-reprecuperacionsemanalnac',
  templateUrl: './reprecuperacionsemanalnac.component.html',
  styleUrls: ['./reprecuperacionsemanalnac.component.css']
})
export class ReprecuperacionsemanalnacComponent implements OnInit {  
  
  constructor(private servicesService: ServiceService) { 
  }

  ngOnInit(): void {
    this.metodoProductor();
  }

  datoscaptura ={
    productor:'',
    fechaini:'',
    fechafin:''
  }

  selectReporte = {
    cCampos:null,cFrom:null,cWhere:null
  }
  repCobranza=null;
  mostrarTablaCh:boolean=false;
  mostrarTablaTb:boolean=false;
  loading=false;

  unionJson = new Array();
  TotalSuma= [{
    'Cliente':'',
    'NomCliente':'',
    'Importe':''
  }];
  
  llamarProcedimiento = {procedure:null,param:null};

  recuperaVenta() {
    this.unionJson.length=0;
    this.llamarProcedimiento.param=0;
    this.llamarProcedimiento.procedure="Call rep_RecuperaSemanal('"+")";
  }

  // COMBO PRODUCTOR
  buscaSelect ={
    cCampos:null, cFrom:null, cWhere:null
  }
  cachaProductor={
    codigo:null,nomcorto:null
  }  
  productorCtrl = new FormControl();
  filteredEmployeeProd: Observable<EmployeeProd[]>;
  employeesProd: EmployeeProd[] = [];
  resultadoProductor=null; 

  private _filterEmployeesprod(value: string): EmployeeProd[] {
    const filterValue = value.toLowerCase();

    return this.employeesProd.filter(state => state.nomcorto.toLowerCase().indexOf(filterValue) === 0);
  }   
  metodoProductor(){
    this.buscaSelect.cCampos="codigo,TRIM(nomcorto) AS nomcorto";
    this.buscaSelect.cFrom= "productor";
    this.buscaSelect.cWhere="";
    this.servicesService.selectQuery(this.buscaSelect).then((result)=>{
    this.resultadoProductor=result
    this.employeesProd=this.resultadoProductor;
    this.filteredEmployeeProd = this.productorCtrl.valueChanges
      .pipe(
        startWith(''),
        map(productor => productor ? this._filterEmployeesprod(productor) : this.employeesProd.slice())
      );
    });
   }

   recuperaSemanal(){
     var fechainicial="";
     var fechafinal="";
     (function ($) {
          fechainicial= $("#txtfechaini").val();
          fechafinal= $("#txtfechafin").val();
        })(jQuery);
        this.llamarProcedimiento.procedure = "Call rep_RecuperaSemanal('"+this.datoscaptura.productor.substring(0,2)+"','"+fechainicial+"','"+fechafinal+"')";
        this.servicesService.StoreReportes(this.llamarProcedimiento,this.datoscaptura.productor.substring(0,2)).then((Data)=>{
        this.repCobranza = Data
        this.mostrarTablaCh = true;
        });
   }

  // pagoPorCliente(){ 
  //   this.loading= true;
  //   var fechainicial="";
  //   var fechafinal="";
  //   (function ($) {
  //     fechainicial= $("#txtfechaini").val();
  //     fechafinal= $("#txtfechafin").val();
  //   })(jQuery);
   
  //   this.mostrarTablaCh=true;
  //   this.selectReporte.cCampos = " Man.Cliente,Cli.Nombre as NomCliente,sum(Abo.Importe) as Importe ";
  //   this.selectReporte.cFrom = " Manifiestos Man Left Outer Join Abonos Abo on Man.id = Abo.idManifiesto Left Outer Join Clientes Cli on Cli.codigo = Man.Cliente";
  //   this.selectReporte.cWhere= " where fecha between '"+ fechainicial +"' and '"+fechafinal+"' and Man.Tipo = 'N' group by Man.Cliente,Cli.nombre";
  //   this.servicesService.selectParaReportes(this.selectReporte,'01')
  //   .then((result)=>{
  //     this.repCobranzaCh=result;
  //     if(this.repCobranzaCh[0]["Vacio"]==""){
  //       this.repCobranzaCh=null;
  //       this.mostrarTablaCh=false;
  //       console.log("No Arrojo Datos.")
  //     }else{
  //       this.sumaColumnas('tChaparral');
  //       //this.pagoPorClienteTb();
  //     }      
  //   });

  // }

  // pagoPorClienteTb(){
  //   console.log("suma tombell");
    
  //   var fechainicial="";
  //   var fechafinal="";
  //   (function ($) {
  //     fechainicial= $("#txtfechaini").val();
  //     fechafinal= $("#txtfechafin").val();
  //   })(jQuery);
   
  //   this.selectReporte.cCampos = " Man.Cliente,Cli.Nombre as NomCliente,sum(Abo.Importe) as Importe ";
  //   this.selectReporte.cFrom = " Manifiestos Man Left Outer Join Abonos Abo on Man.id = Abo.idManifiesto Left Outer Join Clientes Cli on Cli.codigo = Man.Cliente";
  //   this.selectReporte.cWhere= " where fecha between '"+ fechainicial +"' and '"+fechafinal+"' and Man.Tipo = 'N' group by Man.Cliente,Cli.nombre";
  //   this.servicesService.selectParaReportes(this.selectReporte,'02')
  //   .then((result)=>{
  //     this.repCobranzaTb=result;
  //     console.log(this.repCobranzaCh);
  //     if(this.repCobranzaTb[0]["Vacio"]==""){
  //       this.repCobranzaTb=null;
  //       this.mostrarTablaTb=false;
  //      // this.sumartotaldebe();
  //     }else{
  //       this.mostrarTablaTb=true;
  //       this.sumaColumnas('tTombell');
  //      // this.sumartotaldebe();
  //     }      
  //   }); 
  // }

  nTotal = 0;
  sumaColumnas(pid){
    var nSumaTotal = 0;
    (function ($) {
      var total=0;
      $('table#'+pid+' tbody td:nth-child(3)').each(function(index) 
      {
        console.log("Entro al table");
        
        var res =parseFloat($(this).text().replace(/[$,]/gi,'')) ;  
        total+=res;
        console.log("total suma col "+total);
        
      });
      console.log("total sin format "+total);
      
      var totalformateado = new Intl.NumberFormat().format(total);
      
      $('table#'+pid+' tfoot th:nth-child(3)').text("$"+ totalformateado);

      console.log("total chaparral "+ totalformateado);
      nSumaTotal = total;
      
    })(jQuery);

    this.nTotal = nSumaTotal;


    // if(pid=='tChaparral'){
    //   this.pagoPorClienteTb();
    //   // console.log("if total ch");
      
    // }
    // if(pid=='tTombell'){
    //   this.loading= false;
      // this.sumartotaldebe();
    // }
  }

  // sumartotaldebe (){
  //   this.loading= false;
  //   var total=0;
  //   (function ($) {
  //     if($('#tChaparral').is(':visible')){      
  //       $('table#tChaparral tfoot th:nth-child(3)').each(function(index) 
  //       {
  //         var res =parseFloat($(this).text().replace(/[$.]/gi,'')) ;  
  //         total += res;  
  //         console.log(total);
          
  //       });
  //     }
  //     if($('#tTombell').is(':visible')){
  //       $('table#tTombell tfoot th:nth-child(3)').each(function(index) 
  //       {
  //         var res =parseFloat($(this).text().replace(/[$.]/gi,'')) ;  
  //         total += res;  
  //         console.log(total);
  //       });
  //     }
  //     //var totalformateado = new Intl.NumberFormat().format(total);
  //     $('table#tbltotaldeuda tfoot th:nth-child(4)').text("$"+ total);       
  //   })(jQuery);

    
  // }

  llamarPdf(cParamId){
    var cTitulo = "Reporte Cobranza de la Semana."
    var fechainicial= "";
    var fechafinal= "";
    
    var options = { day: 'numeric',month: 'long', year: 'numeric' };
    (function ($) {
      fechainicial= $("#txtfechaini").val();
      fechafinal= $("#txtfechafin").val();
    })(jQuery);

    var cSubtitulo = "Periodo comprendido del "+fechainicial +" al "+fechafinal;
    this.servicesService.pdf(cParamId,cTitulo,cSubtitulo);
  }

}
 
export interface EmployeeProd  {
  codigo:string;
  nomcorto:string;
}
