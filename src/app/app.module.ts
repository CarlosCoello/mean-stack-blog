import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './services/auth.service';
import { BlogService } from './services/blog.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { DeleteBlogComponent } from './blog/delete-blog/delete-blog.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppRoutingModule } from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    PublicProfileComponent,
    ProfileComponent,
    RegisterComponent,
    DeleteBlogComponent,
    EditBlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, BlogService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
