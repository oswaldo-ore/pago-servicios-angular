import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/dashboard/core/guards2/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if(!this.submitted){
      this.submitted = true;
      if (this.loginForm.invalid) {
        this.submitted = false;
        return;
      }
      let username = this.loginForm.get('name')?.value;
      this.authService.userVerify( username )
      .then(response => {
        if(response.success == false){
          this.submitted = false;
          this.toastr.error(response.message, '¡No se pudo iniciar sesion!');
        }else{
          this.toastr.success(response.message, '¡Bienvenido!');
          //pasar parametro a la otra pagina
          this.router.navigate(['payment'], { queryParams: { code: username } });
        }
      })
      .catch(error => {
        this.submitted = false;
        this.toastr.error('No se pudo conectar al servidor', 'Error de conexión');
      });
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
