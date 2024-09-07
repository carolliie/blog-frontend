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

  constructor(private postService: PostService, private route: ActivatedRoute, private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam ? +idParam : null;
      if (id !== null) {
        this.getPostById(id);
      } else {
        console.error('ID do post não foi fornecido ou é inválido.');
      }
    });
  }

  getPostById(id: number) {
    this.postService.getPostById(id).subscribe(res => {
      console.log(res);
      this.post = res;
    }, error => {
      console.error('Method not implemented.');
    })
  }

  deletePostById(id: number) {
    if (confirm('Are you sure you want to delete this post?')) { // Confirmação antes de excluir
      this.postService.deletePostById(id).subscribe({
        next: () => {
          this.message = 'Post deleted successfully';
          this.router.navigate(['/view-all']); // Redireciona para a lista de posts ou outra página
        },
        error: (err) => {
          this.message = 'Failed to delete post:', err;
        }
      });
    }
  }
}