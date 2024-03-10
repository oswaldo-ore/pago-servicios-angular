import { Component } from '@angular/core';
import { FacturasService } from '../../core/services/facturas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginationModel } from '../../core/interfaz/pagination.model';
import { Factura } from '../../core/models/factura.models';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from '../../core/services/servicios.service';
import { Servicio } from '../../core/models/servicios.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DetalleUsuarioFacturas } from '../../core/models/detalle_factura.models';
import Swal from 'sweetalert2';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
})
export class FacturasComponent {
  form: FormGroup;
  paginacion: PaginationModel<Factura> = {
    currentPage: 0,
    total: 0,
    totalPages: 0,
    data: []
  };
  limit: number = 10;

  searchTerms: string = "";
  searchTerm$ = new Subject<string>();

  closeResult="";
  servicios: Servicio[] = [];
  selected: Date = new Date() ;
  selectedFiles?: FileList;

  public constructor(
    private facturaServicio: FacturasService,
    private servicioService: ServiciosService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.form = formBuilder.group({
      servicio: ['', Validators.required],
      monto: ['', Validators.required],
      imagen_factura: ['']
    });
  }

  ngOnInit() {
    this.cargarFacturas();
    this.servicioService.getAll().subscribe(
      (response) => {
        this.servicios = response;
      },
      error => {
        console.log("error "+error);
      }
    );
    this.initSearchTerm();
  }
  initSearchTerm(){
    this.searchTerm$
    .pipe(
      debounceTime(700),
      distinctUntilChanged()
    )
    .subscribe(
      (term) => {
        this.searchTerms = term;
        this.cargarFacturas();
      },
      (error) => {
        console.error('Error al realizar la búsqueda:', error);
      }
    );
  }
  onInputChange(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(term);
  }
  cargarFacturas(page = 1) {
    this.facturaServicio.getPaginacion(page, this.limit,this.searchTerms ).subscribe(
      (response: PaginationModel<Factura>) => {
        this.paginacion = response;
        console.log(response);
      },
      error => {
        this.toastr.error("Error al cargar los usuarios", error.message);
      }
    );
  }

  onPageChange(page = 1) {
    this.paginacion.currentPage = page;
    this.cargarFacturas(page);
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size: 'xl'  }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  formatDate(fecha: Date){
    const options = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    return fecha.toLocaleDateString('es-ES', options);
  }

  private getDismissReason(reason: any): string {
    this.form.reset();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  submit(){
    if(!this.form.valid){
      return;
    }
    let servicio = this.form.get('servicio')?.value;
    let monto = this.form.get('monto')?.value;
    let selectedDate= this.selected;
    let image = this.selectedFiles?.item(0);
    // if(!image){
    //   return;
    // }
    this.facturaServicio.crear(servicio,monto,selectedDate,image).then(
      (response)=>{
        this.modalService.dismissAll();
        this.toastr.success(response.message);
        this.cargarFacturas(this.paginacion.currentPage);
      }
    ).catch((error)=>{
      this.toastr.error(error,"No se pudo completar la accion");
    });
  }

  debenDetalle(detalle: DetalleUsuarioFacturas[] ){
    let monto = 0;
    // detalle.forEach(element => {
    //   monto += element.isprestado? element.monto:0;
    // });
    return parseFloat(monto.toFixed(2));
  }

  calcularSaldoTotal(detalles: DetalleUsuarioFacturas[]):number{
    let suma = 0;
    detalles.forEach(detalle => {
      if(detalle.isPendiente() ){
        suma+=detalle.monto - detalle.monto_pago;
      }
    });
    return suma;
  }
  eliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaServicio.eliminar(id).then((message) => {
          this.toastr.success(message);
          this.cargarFacturas(this.paginacion.currentPage);
          Swal.fire('', message, 'success');
        }).catch((error) => {
          this.toastr.error(error.message);
          Swal.fire('', error.message, 'error');
        });
      }
    });

  }

  navigateToDetalle(id: number) {
    this.router.navigate(['/factura', id]);
  }


  cambiarEstadoPrestado(id:number){
    this.facturaServicio.prestarFacturaPagar(id).then((message) => {
      this.toastr.success(message);
      this.cargarFacturas(this.paginacion.currentPage);
    }).catch((error) => {
      this.toastr.error(error.message);
    });
  }

}
