import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../dashboard/core/guards2/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
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
    private cookieService: CookieService
   ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let username = this.loginForm.get('name')?.value;
    let password = this.loginForm.get('password')?.value;
    this.authService.login({ email: username, password: password })
    .then(response => {
      console.log(response);
      if(response.success == false){
        this.toastr.error(response.message, '¡No se pudo iniciar sesion!');
      }else{
        if (response && response.token) {
          this.cookieService.set('token', response.token);
        }
        this.toastr.success(response.message, '¡Bienvenido!');
        this.router.navigate(['/']);
      }
    })
    .catch(error => {
      this.toastr.error('No se pudo conectar al servidor', 'Error de conexión');
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}

