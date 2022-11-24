import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoNuevoRequest } from '../../interfaces/empleado.interfaces';
import { EmpleadoServices } from '../../services/empleado.services';
import { BeneficiarioServices } from '../../services/beneficiario.services';
import { CommonResponse } from '../../interfaces/comun.interfaces';
import { BeneficiarioNuevoRequest, TipoSexoResponse } from '../../interfaces/beneficiario.interfaces';
import Swal from 'sweetalert2';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})

export class AltaComponent implements OnInit {

  beneficiario: BeneficiarioNuevoRequest[] = [];
  tipoSexo: TipoSexoResponse[] = [];

  empleadorFG: FormGroup = this.formBuilder.group({
    foto: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    puesto: ['', [Validators.required]],
    salario: ['', [Validators.required]]
  });

  beneficiarioFG: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    parentesco: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    sexo: ['', [Validators.required]]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private empleadoServices: EmpleadoServices,
    private beneficiarioServices: BeneficiarioServices
  ) { }

  ngOnInit(): void {
    this.beneficiarioServices.ObtenerPorSexo().subscribe((s: CommonResponse) => {

      console.log("TIPO SEXO => ", s);

      this.tipoSexo = s.data.map((m: TipoSexoResponse) => {
        return {
          sexo: m.sexo,
          descripcion: m.descripcion
        } as TipoSexoResponse;
      });

    }, (error) => {

      throw error;
    });
  }

  empleadoRequest() {
    const params = new EmpleadoNuevoRequest();

    let formEmpleado = this.empleadorFG.value;

    params.foto = formEmpleado.foto;
    params.nombre = formEmpleado.nombre;
    params.puesto = formEmpleado.puesto;
    params.salario = formEmpleado.salario;
    params.beneficiario = this.beneficiario;

    return params;
  }

  beneficiarioRequest() {
    const params = new BeneficiarioNuevoRequest();

    let formBeneficiario = this.beneficiarioFG.value;

    params.nombre = formBeneficiario.nombre;
    params.parentesco = formBeneficiario.parentesco;
    params.fechaNacimiento = formBeneficiario.fechaNacimiento;
    params.sexo = formBeneficiario.sexo;

    return params;
  }

  showAlta() {
    const params = this.empleadoRequest();

    console.log("PARAMS => ", params);

    if (params.beneficiario.length === 0) {
      Swal.fire('Lo sentimos', 'Agrege la información de almenos un Beneficiario!', 'warning');
    } else {
      this.empleadoServices.alta(params).subscribe((s: CommonResponse) => {
        this.router.navigate([`/public/empleado`]);
      }, (error) => {
        throw error;
      });
    }
  }

  showCancelar() {
    this.router.navigate(['/public/empleado']);
  }

  showAgregar() {
    const params = this.beneficiarioRequest();

    this.beneficiario.push(params);    
    console.log("BENEFICIARIOS => ", this.beneficiario);

    this.beneficiarioFG.reset();
  }

  showEliminar(i: any) {
    console.log("I => ", i);
    this.beneficiario.splice(i, 1);

    console.log("BENEFICIARIOS => ", this.beneficiario);
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '0');
  }
}