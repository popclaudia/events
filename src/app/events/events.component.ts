import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventsService } from '../events.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public currentPage?: string;
  public lastPage? : string;

  constructor(private eventsService: EventsService,
    private modalService: NgbModal) { }
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
      this.getEvents(prevPage);

    }else{
      if(n==1 && parseInt(this.currentPage)<parseInt(this.lastPage)){
        this.getEvents(nextPage);
      }
    }
  }


  showDetails(event: Event){
    const target = event.target;
    if(target!=null){

      const idAttr = (<Element>target).getAttribute('id') || '';

      this.eventsService.getEventDetails(idAttr).subscribe(
        response => {
          const details = response;
          this.open(details);
        }

      )
    }
  }


  open(details: any) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = details.data.name;
    modalRef.componentInstance.location = details.data.location;
    modalRef.componentInstance.period = details.data.date.short_date;
    modalRef.componentInstance.description = details.data.description;
    modalRef.componentInstance.image = details.data.image;
  }


}
