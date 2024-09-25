import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostService } from '../../service/post.service';
import { StorageService } from '../_services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditorComponent],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  template: `
  <h1>TinyMCE 7 Angular Demo</h1>
  <editor
    [init]="init"
  />
  `
})
export class EditPostComponent implements OnInit {

  postForm: FormGroup;
  tags: string[] = [];
  tagControl: FormControl;
  message = '';

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
    base_url: '/tinymce', // Root for resources
    suffix: '.min',
    selector: 'editor',  // change this value according to your HTML
    license_key: 'gpl'
  };

  constructor(
    private fb: FormBuilder, 
    private postService: PostService, 
    private storageService: StorageService, 
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(150000)]],
      img: [null]
    });
    this.tagControl = new FormControl('');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get("slug");
      if (slug) {
        this.postService.getPostBySlug(slug).subscribe(post => {
          this.postForm.patchValue({
            name: post.name,
            img: post.img,
            content: post.content
          });
          this.tags = post.tags || [];
        }, error => {
          console.error("Error fetching post by slug:", error);
        });
      }
    });
  }

  addTag() {
    const value = this.tagControl.value.trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }
    this.tagControl.reset();
  }

  removeTag(index: number) {
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.storageService.isLoggedIn()) {
      if (!this.postForm.valid) {
        this.message = "Form is invalid. Please check the fields.";
        return;
      }
      
      const formValue = this.postForm.value;
      formValue.tags = this.tags;
      this.message = "Form Submitted";

      const payload = {
        ...formValue,
        tags: formValue.tags
      };

      const postSlug = this.route.snapshot.paramMap.get("slug");
      if (postSlug) {
        this.postService.editPostBySlug(postSlug, payload).subscribe(response => {
          this.message = "Post updated successfully";
        }, (error: { message: string; }) => {
          this.message = "Error updating post: " + error.message;
        });
      }
    }
  }
}
