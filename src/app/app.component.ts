import { Component, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.title = 'Learning Angular';
  }
  title = 'my-app';
  description = 'Hello World';



  ngAfterViewInit(): void {

  }
}
