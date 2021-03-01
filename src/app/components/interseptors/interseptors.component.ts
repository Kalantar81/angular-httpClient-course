import { Component, OnInit } from '@angular/core';
import { InterseptorsService, ITodo } from './interseptors.service';

@Component({
  selector: 'app-interseptors',
  templateUrl: './interseptors.component.html',
  styleUrls: ['./interseptors.component.less']
})
export class InterseptorsComponent implements OnInit {

  public todos: ITodo[] = [];

  public todoTitle = '';

  public error = '';

  loading = false;

  constructor(private interseptorsService: InterseptorsService) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  public addTodo(): void {
    if (!this.todoTitle.trim().length) {
      return;
    }

    this.interseptorsService.addTodo({
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
    this.interseptorsService.fetchTodos()
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
    this.interseptorsService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
  }

  public completeTodo(id: number): void {
    this.interseptorsService.completeTodo(id)
      .subscribe(
        ((todo: ITodo) => {
          this.todos.find(t => t.id === todo.id).complited = true;
        })
      );
  }
}
