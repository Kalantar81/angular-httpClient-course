import { Component, OnInit } from '@angular/core';
import { HeadersService, ITodo } from './headers.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.less']
})
export class HeadersComponent implements OnInit {

  public todos: ITodo[] = [];

  public todoTitle = '';

  public error = '';

  loading = false;

  constructor(private headersService: HeadersService) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  public addTodo(): void {
    if (!this.todoTitle.trim().length) {
      return;
    }

    this.headersService.addTodo({
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
    this.headersService.fetchTodos()
    .subscribe(
      (data) => {
        console.log(data);
        this.todos = data;
        this.loading = false;
      },
      /** ловим ошибку в компоненте на одном из трех методов имеющихся в subscribe */
      error => {
        this.error = error.message;
      }
    );
  }

  public removeTodo(id: number): void {
    this.headersService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
  }

  public completeTodo(id: number): void {
    this.headersService.completeTodo(id)
      .subscribe(
        ((todo: ITodo) => {
          this.todos.find(t => t.id === todo.id).complited = true;
        })
      );
  }
}
