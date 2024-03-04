import { Component, Input } from '@angular/core';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Movements } from '../../core/interfaz/movement';
import { Usuario } from '../../core/models/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DetailMovement } from '../../core/interfaz/detail_movement';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './details/details.component';
import { PaginationModel } from '../../core/interfaz/pagination.model';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css'],
})
export class MovementsComponent {
  public movements: Movements[] = [];
  usuarioId: number = 0;
  pagination: PaginationModel<Movements> = {
    currentPage: 0,
    total: 0,
    totalPages: 0,
    data: []
  };
  limit: number = 10;
  constructor(
    private usuarioService: UsuariosService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.usuarioId = +idParam;
        this.getMovementsWithPaginateToUser(this.usuarioId);
        // this.getMovementsToUser(this.usuarioId);
      } else {
        console.error('ID es nulo');
      }
    });
  }

  getMovementsWithPaginateToUser(userId: number, page: number = 1, limit: number = 10) {
    this.usuarioService
      .getMovementUserWithPaginate(userId, page, limit)
      .then((response) => {
        this.pagination = response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getMovementsToUser(userId: number) {
    this.usuarioService
      .getMovementUser(userId)
      .then((response) => {
        this.movements = response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  formatDate(fecha: Date) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    if (typeof fecha === 'string') {
      const fechaDate = new Date(fecha);

      if (!isNaN(fechaDate.getTime())) {
        return fechaDate.toLocaleDateString('es-ES', options);
      }
    }
    return fecha.toLocaleDateString('es-ES', options);
  }

  openModalDetails(detailsMovement: DetailMovement[]) {
    const modalRef = this.modalService.open(DetailsComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.detailsMovement = detailsMovement;
  }

  onPageChange(page: number) {
    this.getMovementsWithPaginateToUser(this.usuarioId, page, this.limit);
  }
}
