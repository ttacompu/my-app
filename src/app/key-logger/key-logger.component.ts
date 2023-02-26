import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-key-logger',
  templateUrl: './key-logger.component.html',
  styleUrls: ['./key-logger.component.scss']
})
export class KeyLoggerComponent implements OnInit {
  @ViewChild('keyContainer', { static: true }) input: ElementRef | undefined;
  keys = '';

  ngOnInit() {
    const logger$ = fromEvent<KeyboardEvent>(this.input?.nativeElement, 'keyup');
    logger$.subscribe(evt => this.keys += evt.key);
    console.log(this.keys);
  }

}
