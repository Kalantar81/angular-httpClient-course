import { Component, OnInit } from '@angular/core';
import { ITodo } from '../get-data/get-data.component';
import { ErrorsService } from './errors.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.less']
})
export class ErrorsComponent implements OnInit {

  public todos: ITodo[] = [];

  public todoTitle = '';

  public error = '';

  loading = false;

  constructor(private errorsService: ErrorsService) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  public addTodo(): void {
    if (!this.todoTitle.trim().length) {
      return;
    }

    this.errorsService.addTodo({
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
    this.errorsService.fetchTodos()
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
    this.errorsService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
  }

  public completeTodo(id: number): void {
    this.errorsService.completeTodo(id)
      .subscribe(
        ((todo: ITodo) => {
          this.todos.find(t => t.id === todo.id).complited = true;
        })
      );
  }
}
