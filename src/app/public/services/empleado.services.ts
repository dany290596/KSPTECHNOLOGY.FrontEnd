import { Injectable } from '@angular/core';
import { HttpServices } from '../../shared/services/http.services';
import { Observable } from 'rxjs';
import { CommonResponse } from '../interfaces/comun.interfaces';
import { EmpleadoRequest, EmpleadoNuevoRequest } from '../interfaces/empleado.interfaces';

@Injectable({
    providedIn: 'root'
})

export class EmpleadoServices {
    constructor(
        private httpServices: HttpServices
    ) { }

    obtener(): Observable<CommonResponse> {
        return this.httpServices.httpGet('Empleado', 'Obtener');
    }

    obtenerPorId(request: any): Observable<CommonResponse> {
        let params = '';
        if (
            request.id != "" && request.id != undefined
        ) {
            params = '?';
        }
        if (request.id != "" && request.id != undefined) {
            params = params + "id=" + request.id;
        }

        return this.httpServices.httpGetById('Empleado', 'ObtenerPorId', params);
    }

    inactivar(request: any): Observable<CommonResponse> {
        let params = '';
        if (
            request.id != "" && request.id != undefined
        ) {
            params = '?';
        }
        if (request.id != "" && request.id != undefined) {
            params = params + "id=" + request.id;
        }

        return this.httpServices.httpPatchById('Empleado', 'Inactivar', params);
    }

    activar(request: any): Observable<CommonResponse> {
        let params = '';
        if (
            request.id != "" && request.id != undefined
        ) {
            params = '?';
        }
        if (request.id != "" && request.id != undefined) {
            params = params + "id=" + request.id;
        }

        return this.httpServices.httpPatchById('Empleado', 'Activar', params);
    }

    alta(empleadoRequest: EmpleadoNuevoRequest): Observable<CommonResponse> {
        return this.httpServices.httpPost("Empleado", 'Crear', empleadoRequest);
    }

    actualizar(empleadoRequest: EmpleadoRequest, request: any): Observable<CommonResponse> {
        let params = '';

        if (request.id != "" && request.id != undefined) {
            params = '?';
        }
        if (request.id != "" && request.id != undefined) {
            params = params + "id=" + request.id;
        }

        return this.httpServices.httpPut("Empleado", 'Actualizar', empleadoRequest, params);
    }
}