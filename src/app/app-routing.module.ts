import { AltaComponent } from './public/empleado/alta/alta.component';
import { DetalleComponent } from './public/empleado/detalle/detalle.component';
import { EditarComponent } from './public/empleado/editar/editar.component';
import { Routes } from '@angular/router';

export const Approutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'public',
        loadChildren:
          () => import('./public/public.module').then(m => m.PublicModule)
      },
      {
        path: 'empleado/alta',
        component: AltaComponent,
        data: {
          title: 'Alta del Empleado',
        }
      },
      {
        path: 'empleado/detalle/:num',
        component: DetalleComponent,
        data: {
          title: 'Detalle del Empleado',
        }
      },
      {
        path: 'empleado/editar/:num',
        component: EditarComponent,
        data: {
          title: 'Editar Empleado',
        }
      },
      {
        path: 'public/empleado/:num',
        component: AltaComponent,
        data: {
          title: 'Inicio del Sistema',
        }
      },
    ]
  }
];