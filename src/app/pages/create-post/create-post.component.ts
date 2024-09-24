import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostService } from '../../service/post.service';
import { StorageService } from '../_services/storage.service';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditorComponent],
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

export class CreatePostComponent {
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

  constructor(private fb: FormBuilder, private postService: PostService, private storageService: StorageService) {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, Validators.required]
    });
    this.tagControl = new FormControl('');
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

      this.postService.createNewPost(payload).subscribe(response => {
        this.message = "Post created successfully", response;
      });
    }
  }
}