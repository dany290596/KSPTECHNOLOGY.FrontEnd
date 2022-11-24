import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, from } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { CommonResponse } from '../interfaces/http.interfaces';

const urlApi = environment.api;

@Injectable({
    providedIn: 'root'
})

export class HttpServices {

    constructor(
        private httpClient: HttpClient
    ) { }

    private log(message: string) {
        console.log(message);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    httpPost(
        controlador: string,
        metodo: string,
        objeto: any
    ): Observable<CommonResponse> {
        const url = (`${urlApi}/${controlador}/${metodo}`);

        return this.httpClient.post<CommonResponse>(url, objeto)
            .pipe(map((t: CommonResponse) => {

                return t;
            }, (error: any) => {
                throw error;
            }),
                tap(t => {
                    this.log(t.mensaje),
                        catchError(this.handleError('Error la operación no se realizó correctamente.', []))
                })
            );
    }

    httpPut(
        controlador: string,
        metodo: string,
        objeto: any,
        parametro: any
    ): Observable<CommonResponse> {
        const url = (`${urlApi}/${controlador}/${metodo}${parametro}`);

        return this.httpClient.put<CommonResponse>(url, objeto)
            .pipe(map((t: CommonResponse) => {
                return t;
            }, (error: any) => {
                throw error;
            }),
                tap(t => {
                    this.log(t.mensaje),
                        catchError(this.handleError('Error la operación no se realizó correctamente.', []))
                })
            );
    }

    httpGet(
        controlador: string,
        metodo: string
    ): Observable<CommonResponse> {
        const url = (`${urlApi}/${controlador}/${metodo}`);

        return this.httpClient.get<CommonResponse>(url, {})
            .pipe(map((t: CommonResponse) => {

                console.log("T => ", t);
                return t;
            }, (error: any) => {
                throw error;
            }),
                tap(t => {
                    this.log(t.mensaje),
                        catchError(this.handleError('Error la operación no se realizó correctamente.', []))
                })
            );
    }

    httpGetById(
        controlador: string,
        metodo: string,
        parametro: any
    ): Observable<CommonResponse> {
        const url = (`${urlApi}/${controlador}/${metodo}${parametro}`);

        return this.httpClient.get<CommonResponse>(url, {})
            .pipe(map((t: CommonResponse) => {
                console.log("T => ", t);
                return t;
            }, (error: any) => {
                throw error;
            }),
                tap(t => {
                    this.log(t.mensaje),
                        catchError(this.handleError('Error la operación no se realizó correctamente.', []))
                })
            );
    }

    httpPatchById(
        controlador: string,
        metodo: string,
        parametro: any
    ): Observable<CommonResponse> {
        const url = (`${urlApi}/${controlador}/${metodo}${parametro}`);

        return this.httpClient.patch<CommonResponse>(url, {})
            .pipe(map((t: CommonResponse) => {
                console.log("T => ", t);
                return t;
            }, (error: any) => {
                throw error;
            }),
                tap(t => {
                    this.log(t.mensaje),
                        catchError(this.handleError('Error la operación no se realizó correctamente.', []))
                })
            );
    }
}