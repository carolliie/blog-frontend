import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-post',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.css'
})
export class DeletePostComponent  implements OnInit {
  post: any;
  isLoggedIn = false;
  message = '';

  constructor(private postService: PostService, private route: ActivatedRoute, private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam ? +idParam : null;
      if (id !== null) {
        this.deletePostById(id);
        this.message = 'Post deletado.';
      } else {
        this.message = 'Post deletado.';
      }
    });
  }

  deletePostById(id: number) {
    this.postService.deletePostById(id).subscribe(res => {
      this.message = res;
      this.post = res;
    }, error => {
      this.message = 'Method not implemented.';
    })
  }
}
