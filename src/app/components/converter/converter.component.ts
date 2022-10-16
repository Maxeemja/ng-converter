import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  firstInput: number | null = null;
  secondInput: number | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
