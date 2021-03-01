import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.less']
})
export class GetDataComponent implements OnInit {

  public todos: ITodo[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .subscribe(
        (data) => {
          console.log(data);
          this.todos = data;
        });
  }

}


export interface ITodo {
  complited: boolean;
  title: string;
  id?: number;
}
