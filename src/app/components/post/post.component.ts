import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ITodo } from '../get-data/get-data.component';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {

  public todos: ITodo[] = [];

  public todoTitle = '';

  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  public addTodo(): void {
    if (!this.todoTitle.trim().length) {
      return;
    } else {
      const newTodo: ITodo = {
        title: this.todoTitle,
        complited: false
      };

      this.http.post<ITodo>('https://jsonplaceholder.typicode.com/todos', newTodo)
        .subscribe(todo => {
          console.log(todo);
          this.todos.push(todo);
          this.todoTitle = '';
        });
    }
  }

  public fetchTodos(): void {
    this.loading = true;
    this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
    .pipe(delay(1500))
    .subscribe(
      (data) => {
        console.log(data);
        this.todos = data;
        this.loading = false;
      });
  }

  public removeTodo(id: number): void {
    this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
  }

}
