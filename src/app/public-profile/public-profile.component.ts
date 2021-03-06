import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  currentUrl;
  username;
  email;
  foundProfile: boolean = false;
  messageClass;
  message;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.getPublicProfile(this.currentUrl.username).subscribe( data => {
      if(!data.user){
        this.foundProfile = false;
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.foundProfile = true;
        this.username = data.user.username;
        this.email = data.user.email;
      }
    })
  }

}
