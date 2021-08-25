import { getMissingNgModuleMetadataErrorData } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MyProfileService } from '../my-profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  @ViewChild('newImage')
  newImage!: ElementRef<HTMLInputElement>;
  
  public userData: any;
  public avatar = '';
  public name = '';
  public email = '';
  public preffered_industries_topics: any;
  constructor(private myProfileService: MyProfileService) { }

  ngOnInit(): void {
      this.getUserData();


      
     
  }

  getUserData(){
    this.myProfileService.getUserData()
    .subscribe(
      response => {
      this.userData=response;
      this.parseData();
    },
    error => {
      console.log(error.error.message);
    }
    
    );
  }

  parseData(){
    this.avatar = this.userData.data.about_me.avatar_url;
    this.name = this.userData.data.about_me.last_name + ' ' + this.userData.data.about_me.first_name;
    this.email = this.userData.data.about_me.email;

    this.preffered_industries_topics = this.userData.data.about_me.preferred_industries



  }


  updateProfilePicture(){


    const formData = new FormData();
    formData.append('file', this.newImage.nativeElement.value)
    formData.append("type", "avatar");
    formData.append("id", this.userData.data.id);

    this.myProfileService.postUserImage(formData).subscribe(
      response => {
        this.userData=response;
        // this.parseData();
      }

    )

    console.log('heyy')
  }



}
