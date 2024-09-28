import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css'
})
export class ViewAllComponent implements OnInit{

  allPosts: any;
  post: any;
  images: { [key: string]: string } = {};
  constructor(private postService: PostService){}

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(res => {
      console.log(res);
      this.allPosts = res;
    }, error => {
      console.error('Method not implemented.');
    })
  }

  /*getPostById(id:number) {
    this.postService.getPostById(id).subscribe(res => {
      console.log(res);
      this.post = res;
    }, error => {
      console.error('Method not implemented.');
    })
  }*/

    getPostBySlug(slug:string) {
      this.postService.getPostBySlug(slug).subscribe(res => {
        console.log(res);
        this.post = res;
      }, error => {
        console.error('Method not implemented.');
      })
    }
}
