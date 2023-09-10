import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/dashboard/core/models/usuario.model';
import { UsuariosService } from 'src/app/dashboard/core/services/usuarios.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {
  @Input() isCreating: boolean=true;
  @Input() usuario: Usuario|any ;

  form: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private toastr: ToastrService
    ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      cod_pais: ['', Validators.required],
      telefono: [ '', Validators.required]
    });
  }

  ngOnInit() {
    this.form.get('nombre')?.setValue(this.usuario.nombre);
    this.form.get('apellidos')?.setValue(this.usuario.apellidos);
    this.form.get('cod_pais')?.setValue(this.usuario.cod_pais);
    this.form.get('telefono')?.setValue(this.usuario.telefono);
  }

  closeModal(){
    this.activeModal.dismiss('cerrar');
  }

  saveUser(){
    if(this.form.valid){
      let nombre = this.form.get('nombre')?.value;
      let apellidos = this.form.get('apellidos')?.value??"";
      let codPais = this.form.get('cod_pais')?.value??"";
      let telefono = this.form.get('telefono')?.value??"";
      if(this.isCreating){
        this.usuarioService.crearUsuario(nombre,apellidos,codPais,telefono).then(
          (response) => {
            this.activeModal.close(response);
            // this.toastr.success(response.message);
            // this.cargarUsuarios();
          }
        ).catch(error => {
          this.toastr.success(error.message);
        });
      }else{
        let id = this.usuario.id;
        this.usuarioService.updateUsuario(id,nombre,apellidos,codPais,telefono).then(
          (response) => {
            this.activeModal.close(response);
            // this.toastr.success(response.message);
            // this.cargarUsuarios();
          }
        ).catch(error => {
          this.toastr.success(error.message);
        });
      }
    }
  }
}
