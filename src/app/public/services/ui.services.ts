import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class UiServices {
  constructor(
  ) { }

  showSweetAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon,
  ) {
    Swal.fire(title, text, icon);
  }
  /** DBR - Métodos para mostrar mensajes SweetAlert2 */
  /** DBR - Validación de un CURP existente */
  validaCURP(curp: any) {
    const re = new RegExp(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/);
    const validado = curp.match(re);
    const msjError = 'El formato del CURP es inválido. <br/><strong>¡Favor de capturarlo correctamente!</strong >';
    /** No coincide con el formato general */
    if (!validado) {
      this.showSweetAlert('Error', msjError, 'error');
      return false;
    }
    const valida = this.digitoVerificador(validado[1]);
    if (validado[2] !== valida.toFixed()) {
      this.showSweetAlert('Error', msjError, 'error');
      return false;
    }
    /** Valido */
    return true;
  }
  /** DBR - Validación de un CURP existente */
  /** DBR - Validar que coincida el dígito verificador */
  digitoVerificador(curp17: string) {
    const diccionario = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    let lngSuma = 0.0;
    let lngDigito = 0.0;
    for (let i = 0; i < 17; i++) {
      lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
    }
    lngDigito = 10 - lngSuma % 10;
    if (lngDigito === 10) { return 0; }
    return lngDigito;
  }
  /** DBR - Validar que coincida el dígito verificador */
}