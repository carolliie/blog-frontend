import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent implements OnInit {
  post: any;
  isLoggedIn = false;
  message = "";

  getFirstParagraph(): string {
    const paragraph = this.post.content;
    const firstParagraph = paragraph.split('</p>')[0] + '</p>';
    return firstParagraph;
  }

  getContentWithoutFirstParagraph(): string {
    const paragraphs = this.post.content.split('</p>');
    paragraphs.shift();
    return paragraphs.join('</p>');
  }

  constructor(private postService: PostService, private route: ActivatedRoute, private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.route.paramMap.subscribe(params => {
      const slugParam = params.get('slug');
      
      if (slugParam !== null) {
        this.getPostBySlug(slugParam);
      } else {
        console.error('Slug do post não foi fornecido ou é inválido.');
      }
    });
  }
  
  getPostBySlug(slug: string) {
    this.postService.getPostBySlug(slug).subscribe(res => {
      console.log(res);
      this.post = res;
    }, error => {
      console.error('Erro ao obter post:', error); 
    });
  }
  

  /*getPostById(id: number) {
    this.postService.getPostById(id).subscribe(res => {
      console.log(res);
      this.post = res;
    }, error => {
      console.error('Method not implemented.');
    })
  }*/

  editPostBySlug(slug: string, data: any) {
    this.postService.editPostBySlug(slug, data).subscribe(res => {
      console.log(res);
      this.post = res;
    }, error => {
      console.error('Method not implemented.');
    })
  }

  deletePostById(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePostById(id).subscribe({
        next: () => {
          this.message = 'Post deleted successfully';
          this.router.navigate(['/view-all']);
        },
        error: (err) => {
          this.message = 'Failed to delete post:', err;
        }
      });
    }
  }
}