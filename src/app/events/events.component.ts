import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  name = "";
  email = "";
  constructor() { }

  ngOnInit(): void {
    this.name = localStorage.getItem('user-data') || "{}";
    this.name = JSON.parse(this.name).first_name + " " + JSON.parse(this.name).last_name;
    
    this.email = localStorage.getItem('user-data') || "{}";
    this.email = JSON.parse(this.email).email;
    
  }

}
