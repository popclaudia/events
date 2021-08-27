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
  
  @ViewChild('form')
  form!: ElementRef<HTMLInputElement>;

  public userData: any;
  public imageUrl: any;
  public avatar = '';
  public name = '';
  public email = '';
  public preffered_industries_topics: any;
  loading=false;
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
      const profilePic = document.getElementById('profile-pic');
      if(profilePic!=null)
        profilePic.style.filter = 'none';
      const uploadIcon = document.getElementById('upload-icon');
      const saveButton = document.getElementById('save-changes');
      if(uploadIcon && saveButton){
        uploadIcon.style.display = 'block';
        saveButton.style.display = 'none';
      }
      this.loading=false;
    },

    
    );
  }

  parseData(){
    this.avatar = this.userData.data.about_me.avatar_url;
    this.name = this.userData.data.about_me.last_name + ' ' + this.userData.data.about_me.first_name;
    this.email = this.userData.data.about_me.email;

    this.preffered_industries_topics = this.userData.data.about_me.preferred_industries
  }

preview(){
  const profilePic = document.getElementById('profile-pic');
  if(profilePic!=null){
    profilePic.style.filter = 'blur(5px)';

    const uploadIcon = document.getElementById('upload-icon');
    const saveButton = document.getElementById('save-changes');
    if(uploadIcon && saveButton){
      uploadIcon.style.display = 'none';
      saveButton.style.display = 'block';

    }
    
  }
}

  updateProfilePicture(){
    const formm = document.querySelector("form") || undefined;
    var formData = new FormData(formm);
    formData.append("type", "avatar");
    formData.append("id", this.userData.data.id);
    this.loading=true;
    this.myProfileService.postUserImage(formData).subscribe(
      response => {
        this.imageUrl = response;
        this.myProfileService.putUserImage(this.imageUrl.data.url).subscribe(
          response =>{
              this.getUserData();
              
            }
        )
      }

    )
  }

}
