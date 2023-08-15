import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
 // bread crumb items
 breadCrumbItems!: Array<{}>;

 constructor() { }

 ngOnInit(): void {
   /**
   * BreadCrumb
   */
    this.breadCrumbItems = [
     { label: 'Pages' },
     { label: 'Starter', active: true }
   ];
 }
}
