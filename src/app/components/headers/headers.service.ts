import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(private http: HttpClient) { }

  public addTodo(todo: ITodo): Observable<ITodo> {
    const customHeaders = new HttpHeaders({
          myCustomHeader: Math.random().toString(),
          anotherHeader: 'header must be a string'
        });

    return this.http.post<ITodo>(
      'https://jsonplaceholder.typicode.com/todos',
      todo,
      {
        headers: customHeaders
      }
      // {
      //   headers: new HttpHeaders({
      //     'MyCustomHeader': Math.random().toString()
      //   })
      // }
      );
    }

  public fetchTodos(): Observable<Array<ITodo>> {
    /** передача параметров через переменную query params */
    let params = new HttpParams();
    params = params.append('_limit', '4');
    params = params.append('custom', 'anything');

    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos',
    // {params: new HttpParams().set('_limit', '3')}
    {
      params,
      /** ответственнен за то, в каком виде возвращается инфа с сервера
       * default: 'body'
       */
      observe: 'response'
    }
    )
      .pipe(
        /** переводим приходящий обьект в формат body
         * получает более развернутые данные
         */
        map(response => {
          console.log('Response ', response);
          return response.body;
        }),
        delay(1500),
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error);
        })
      );
  }

  public removeTodo(id: number): Observable<any> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      observe: 'events'
    }).pipe(
      tap(event => {
        if (event.type === HttpEventType.Sent) {
          console.log('Sent ', event);
        }

        if (event.type === HttpEventType.Response) {
          console.log('Response ', event);
        }
      })
    );
  }

  public completeTodo(id: number): Observable<any> {
    return this.http.put<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {complited: true},
      {
        /** определяет тип даты, которая возвращается с сервера */
        responseType: 'json'
      }
    );
  }

}


export interface ITodo {
  complited: boolean;
  title: string;
  id?: number;
}

