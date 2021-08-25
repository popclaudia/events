import { Component, OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public currentPage?: string;
  public lastPage? : string;

  constructor(private eventsService: EventsService) { }
  public events: any;
  ngOnInit(): void {
    this.getEvents("");
  }

  getEvents(page: string): void {
    this.eventsService.getEvents(2, page)
      .subscribe(
        response => {
          this.events = response.data.items;
          localStorage.setItem('current-page', response.data.pagination.current_page);
          localStorage.setItem('last-page', response.data.pagination.last_page);
          this.currentPage = localStorage.getItem('current-page') + "";
          this.lastPage = localStorage.getItem('last-page') + "";
          if(response.data.pagination.next_page != null){
            localStorage.setItem('next-page-url', response.data.pagination.next_page.substring(46));
          }
          console.log( response.data.items);
      },
      error => {
        console.log(error.error.message);
       
      }
      );  
  }

  
  navigate(n: number){
    this.currentPage = localStorage.getItem('current-page') + "";
    this.lastPage = localStorage.getItem('last-page') + "";
    let nextPage = localStorage.getItem('next-page-url') + "";
    let prevPage = localStorage.getItem('next-page-url') + "";
    let pageArray = prevPage.split("=");

    if(this.currentPage == this.lastPage){
      prevPage = pageArray[0] + '=' + (parseInt(pageArray[1]) - 1);
    }else{  
      prevPage = pageArray[0] + '=' + (parseInt(pageArray[1]) - 2);
    }
    
    if(n==-1 && this.currentPage!="1"){
      console.log(prevPage);
      this.getEvents(prevPage);

    }else{
      if(n==1 && parseInt(this.currentPage)<parseInt(this.lastPage)){
        console.log('next');
        this.getEvents(nextPage);
      }
    }
  }



}
