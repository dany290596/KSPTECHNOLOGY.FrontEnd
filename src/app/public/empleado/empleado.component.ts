import { Component, OnInit } from '@angular/core';
import { EmpleadoServices } from '../services/empleado.services';
import { CommonResponse } from '../interfaces/comun.interfaces';
import { EmpleadoResponse } from '../interfaces/empleado.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})

export class EmpleadoComponent {

  empleadoResponse: EmpleadoResponse[] = [];

  constructor(
    private empleadoServices: EmpleadoServices,
    private router: Router
  ) { }

  async ngOnInit() {
    this.obtenerEmpleados();
  }

  async obtenerEmpleados() {
    this.empleadoServices.obtener().subscribe((s: CommonResponse) => {

      console.log("S => ", s);

      if (s.data.length > 0) {
        this.empleadoResponse = s.data.map((m: any) => {
          return {
            EId: m.id,
            EFoto: m.foto,
            ENombre: m.nombre,
            EPuesto: m.puesto,
            ESalario: m.salario,
            EEstatus: m.estatus,
            EFechaContratacion: m.fechaContratacion
          } as EmpleadoResponse;
        });
      } else {

      }

    }, (error) => {

      throw error;
    });
  }

  showAlta() {
    console.log("EMPLEADO");
    this.router.navigate([`empleado/alta`]);
  }

  showVerDetalle(empleadoId: string) {
    console.log("EMPLEADO ID => ", empleadoId);
    this.router.navigate([`empleado/detalle/${empleadoId}`]);
  }

  showEditar(empleadoId: string) {
    console.log("EMPLEADO ID => ", empleadoId);
    this.router.navigate([`empleado/editar/${empleadoId}`]);
  }

  showInactivar(empleadoId: string) {
    console.log("EMPLEADO ID => ", empleadoId);

    let request: any = {
      id: empleadoId
    }

    this.empleadoServices.inactivar(request).subscribe((s: CommonResponse) => {

      console.log(s.mensaje);
      window.location.reload();

    }, (error) => {

      throw error;
    });
  }

  showActivar(empleadoId: string) {
    console.log("EMPLEADO ID => ", empleadoId);

    let request: any = {
      id: empleadoId
    }

    this.empleadoServices.activar(request).subscribe((s: CommonResponse) => {

      console.log(s.mensaje);
      window.location.reload();

    }, (error) => {

      throw error;
    });
  }
}