import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css']
})
export class DeleteBlogComponent implements OnInit {

  messageClass;
  message;
  foundBlog: boolean = false;
  processing: boolean = false;
  blog;
  currentUrl;

  constructor(private blogService: BlogService, private router: Router, private activatedRoute: ActivatedRoute) { }

  deleteBlog(){
    this.processing = true;
    this.blogService.deleteSingleBlog(this.currentUrl.id).subscribe( data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout( () => {
          this.router.navigate(['/blog']);
        }, 2000);
      }
    });
  };

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe( data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.blog = {
          title: data.blog.title,
          body: data.blog.body,
          createdBy: data.blog.createdBy,
          createdAt: data.blog.createdAt
        }
        this.foundBlog = true;
      }
    })
  }

}
