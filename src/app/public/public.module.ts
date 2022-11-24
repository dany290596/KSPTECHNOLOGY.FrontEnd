import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpleadoComponent } from './empleado/empleado.component';
import { PublicRoutes } from './public.routing';
import { AltaComponent } from './empleado/alta/alta.component';
import { DetalleComponent } from './empleado/detalle/detalle.component';
import { EditarComponent } from './empleado/editar/editar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PublicRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        EmpleadoComponent,
        AltaComponent,
        DetalleComponent,
        EditarComponent
    ]
})

export class PublicModule { }