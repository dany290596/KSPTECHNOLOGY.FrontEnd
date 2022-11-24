import { ProgressAnimationType } from 'ngx-toastr';

export class OptionsToast {
    /**
     * Tiempo de vida del toast en milisegundos
     * default: 5000
     */
    timeOut?: number;
    /**
     * Mostrar botón de cierre
     * default: false
     */
    closeButton?: boolean;
    /**
     * Tiempo para cerrar después de que un usuario se posesione sobre el toast
     * default: 1000
     */
    extendedTimeOut?: number;
    /**
     * Mostrar barra de progreso en toast
     * default: false
     */
    progressBar?: boolean;
    /**
     * Cambia la animación de la barra de progreso
     * default: 'decreasing' - 'increasing'
     */
    progressAnimation?: ProgressAnimationType;
    /**
     * css class on toast container
     * default: toast-top-right | toast-top-left,top-full-width, toast-top-center, toast-bottom-right, toast-bottom-left,
     * bottom-full-width, toast-bottom-center
     */
    positionClass?: string;
    /** Tiempo de animación en aparición del toast
     * default: 200
     */
    easeTime?: number;
}