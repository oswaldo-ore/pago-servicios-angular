import { Component, Input } from '@angular/core';
import { PaginationModel } from 'src/app/dashboard/core/interfaz/pagination.model';
import { DetalleUsuarioFacturas } from 'src/app/dashboard/core/models/detalle_factura.models';
import { UsuariosService } from 'src/app/dashboard/core/services/usuarios.service';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css']
})
export class DebtsComponent {
  @Input() code: any;
  pagination: PaginationModel<DetalleUsuarioFacturas> = {
    currentPage: 0,
    total: 0,
    totalPages: 0,
    data: [],
  };
  page = 1;
  constructor(
    private userService: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.getDebtsPaid();
  }

  async getDebtsPaid() {
    if(!this.code){
      return;
    }
    this.userService
      .detalleDeudasUsuarioWithPaginateByCode(this.code, this.page)
      .subscribe(
        (response: PaginationModel<DetalleUsuarioFacturas>) => {
          this.pagination = response;
        },
        (error) => {}
      );
  }

  onPageChange(page = 1) {
    this.page = page
    this.getDebtsPaid();
  }

  formatDate(fecha: Date) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    return fecha.toLocaleDateString('es-ES', options);
  }
  formatDate2(fecha: Date | null | undefined) {
    if (fecha == null) {
      return '';
    }
    const options2 = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    } as const;
    return fecha.toLocaleDateString('es-ES', options2);
  }
}
