import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { ITodo } from '../get-data/get-data.component';
import { RestApiService } from './rest-api.service';

@Component({
  selector: 'app-rest-in-service',
  templateUrl: './rest-in-service.component.html',
  styleUrls: ['./rest-in-service.component.less']
})
export class RestInServiceComponent implements OnInit {


  public todos: ITodo[] = [];

  public todoTitle = '';

  loading = false;

  constructor(private http: HttpClient, private restApi: RestApiService) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  public addTodo(): void {
    if (!this.todoTitle.trim().length) {
      return;
    }

    this.restApi.addTodo({
      title: this.todoTitle,
      complited: false
    }).subscribe((todo) => {
      console.log(todo);
      this.todos.push(todo);
      this.todoTitle = '';
    });
  }

  public fetchTodos(): void {
    this.loading = true;
    this.restApi.fetchTodos()
    .subscribe(
      (data) => {
        console.log(data);
        this.todos = data;
        this.loading = false;
      });
  }

  public removeTodo(id: number): void {
    this.restApi.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
  }

  public completeTodo(id: number): void {
    this.restApi.completeTodo(id)
      .subscribe(
        ((todo: ITodo) => {
          this.todos.find(t => t.id === todo.id).complited = true;
        })
      );
  }

}
