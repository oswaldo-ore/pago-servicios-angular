import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { NgModule } from "@angular/core";
import { UnauthguardGuard } from "../dashboard/core/guards2/unauthguard.guard";


const routes: Routes = [
  { path:'', component:LoginComponent , canActivate:[UnauthguardGuard] }
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule],
})

export class LoginRoutingModule {}
