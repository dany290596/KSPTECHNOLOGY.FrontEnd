import { Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';

export const PublicRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'empleado',
                component: EmpleadoComponent
            }
        ]
    }
];