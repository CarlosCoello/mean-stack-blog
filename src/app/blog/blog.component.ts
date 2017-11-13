import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

messageClass;
message;
showMessage = false;
newPost = false;
loadingBlogs = false;
form;
commentForm;
processing = false;
username;
blogPosts;
newComment = [];
enableComments = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private blogService: BlogService) {
    this.createNewBlogForm();
    this.createCommentForm();
  }

  createNewBlogForm(){
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    });
  }

  enableBlogForm(){
    this.form.get('title').enable();
    this.form.get('body').enable();
  }

  disableBlogForm(){
    this.form.get('title').disable();
    this.form.get('body').disable();
  }

  onBlogSubmit(){
    this.processing = true;
    this.disableBlogForm();

    const blog = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.username
    }

    this.blogService.newBlog(blog).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableBlogForm();
      } else {
        this.showMessage = true;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout( () => {
          this.showMessage = false;
          this.processing = false;
          this.form.reset();
          this.enableBlogForm();
          this.getAllBlogs();
          this.newPost = false;
        }, 2000);
      }
    });
  }

  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe( data => {
      this.blogPosts = data.blogs;
    });
  };

  goBack(){
    window.location.reload();
  }

  alphaNumericValidation(controls){
    const regExp = new RegExp( /^[-\w\s]+$/ );
    if(regExp.test(controls.value)){
      return null;
    } else {
      return {'alphaNumericValidation': true}
    }
  }

  newBlogForm(){
    this.newPost = true;
  }

  reloadBlogs(){
    this.loadingBlogs = true;
    this.getAllBlogs();

    setTimeout(() => {
      this.loadingBlogs = false;
    }, 4000);
  }

  likeBlog(id){
    this.blogService.likeBlog(id).subscribe( data => {
      this.getAllBlogs();
    })
  }

  dislikeBlog(id){
    this.blogService.dislikeBlog(id).subscribe( data => {
      this.getAllBlogs();
    })
  }

  createCommentForm(){
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])]
    })
  }

  draftComment(id){
    this.newComment = [];
    this.newComment.push(id);
  }

  saveComment(id){
    this.processing = true;
    const comment = this.commentForm.get('comment').value;
    this.blogService.saveComment(id, comment).subscribe( data => {
      this.getAllBlogs();
      const index = this.newComment.indexOf(id);
      this.newComment.splice(index, 1);
      this.commentForm.reset();
      this.processing = false;
    })
  }

  cancelComment(id){
    const index = this.newComment.indexOf(id);
    this.newComment.splice(index, 1);
    this.commentForm.reset();
    this.enableCommentForm();
    this.processing = false;
  }

  enableCommentForm(){
    this.form.get('comment').enable();
  }

  disableCommentForm(){
    this.form.get('comment').disable();
  }

  expand(id){
    this.enableComments.push(id);
  }

  collapse(id){
    const index = this.enableComments.indexOf(id);
    this.enableComments.splice(index, 1);
  }

  ngOnInit() {
    this.authService.getProfile().subscribe( profile => {
      this.username = profile.username;
    });
    this.getAllBlogs();
  }

}
