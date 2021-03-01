import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private http: HttpClient) { }

  public addTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>('https://jsonplaceholder.typicode.com/todos', todo);
  }

  /** можно использовать метод catchError() из 'rxjs/operators'
   * для того, чтобы увидеть ошибку, надо передать неправильный URL
   */
  public fetchTodos(): Observable<Array<ITodo>> {
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .pipe(
        delay(1500),
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error);
        })
      );
  }

  public removeTodo(id: number): Observable<void> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  public completeTodo(id: number): Observable<ITodo> {
    return this.http.put<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {complited: true});
  }

}


export interface ITodo {
  complited: boolean;
  title: string;
  id?: number;
}

