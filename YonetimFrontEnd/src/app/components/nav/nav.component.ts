import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  styleClass = "";
  constructor(

  ) { }

  ngOnInit(): void {
  }
  changeStyleClass(text: string) {
    return "fixed-plugin ps " + text;
  }

}
