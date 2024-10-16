import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../../service/post.service';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-recent-posts',
  standalone: true,
  imports: [FormsModule, NgClass, CommonModule],
  templateUrl: './recent-posts.component.html',
  styleUrl: './recent-posts.component.css'
})
export class RecentPostsComponent implements OnInit, AfterViewInit {
  @ViewChild('path', {static: true}) path!: ElementRef<SVGPathElement>;

  allPosts: any;
  post: any;
  images: { [key:string]: string } = {};

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getAllPosts();
  }

  ngAfterViewInit(): void {
      const pathElement = this.path.nativeElement;
      const pathLength = pathElement.getTotalLength();

      pathElement.style.strokeDasharray = `${pathLength}`;
      pathElement.style.strokeDashoffset = `${pathLength}`;

      if(this.path) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if(entry.isIntersecting) {
              gsap.to(pathElement, {
                strokeDashoffset: 0,
                duration: 3,
                ease: "power2.out"
              });
              observer.unobserve(this.path.nativeElement);
            }
          },
          {
            root: null,
            threshold: 0.5
          }
        );
        observer.observe(this.path.nativeElement);
      }
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(res => {
      this.allPosts = res;
    }, error => {
      console.error("Posts unavaible.");
    })
  }

  getPostBySlug(slug:string) {
    this.postService.getPostBySlug(slug).subscribe(res => {
      this.post = res;
    }, error => {
      console.error("Post not found");
    }) 
  }

  get reversedPosts() {
    return [...this.allPosts].reverse();
  }

}
