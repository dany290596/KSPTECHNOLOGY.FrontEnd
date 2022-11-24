import { Injectable } from '@angular/core';
import { HttpServices } from '../../shared/services/http.services';
import { Observable } from 'rxjs';
import { CommonResponse } from '../interfaces/comun.interfaces';

@Injectable({
    providedIn: 'root'
})

export class BeneficiarioServices {
    constructor(
        private httpServices: HttpServices
    ) { }

    ObtenerPorSexo(): Observable<CommonResponse> {
        return this.httpServices.httpGet('Beneficiario', 'ObtenerPorSexo');
    }
}