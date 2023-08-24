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
  searchTerms = "";
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
      imagen_factura: ['',Validators.required]
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
  }

  cargarFacturas(page = 1) {
    this.facturaServicio.getPaginacion(page, this.limit).subscribe(
      (response: PaginationModel<Factura>) => {
        this.paginacion = response;
        console.log(this.paginacion);

      },
      error => {
        this.toastr.error("Error al cargar los usuarios", error.message);
      }
    );
  }

  onPageChange(page = 1) {
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
    if(!image){
      return;
    }
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
  eliminar(id: number) {
    this.facturaServicio.eliminar(id).then((message) => {
      this.toastr.success(message);
      this.cargarFacturas(this.paginacion.currentPage);
    }).catch((error) => {
      this.toastr.error(error.message);
    });
  }

  navigateToDetalle(id: number) {
    this.router.navigate(['/factura', id]);
  }

}
