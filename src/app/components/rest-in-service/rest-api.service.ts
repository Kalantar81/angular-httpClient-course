import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  public addTodo(todo: ITodo): Observable<ITodo> {
    /** здесь происходит иннициализация стрима,
     * а его вызов может происходит в любом другом месте,
     * например, в компоненте
     */
    return this.http.post<ITodo>('https://jsonplaceholder.typicode.com/todos', todo);
  }

  public fetchTodos(): Observable<Array<ITodo>> {
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .pipe(
        delay(1500)
      );
  }

  public removeTodo(id: number): Observable<void> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  /** метод PUT, это как метод update
   * изменяет поле или поля в существующем обьекте
   */
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
