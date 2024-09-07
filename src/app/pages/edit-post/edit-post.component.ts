import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostService } from '../../service/post.service';
import { StorageService } from '../_services/storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {

  postForm: FormGroup;
  tags: string[] = [];
  tagControl: FormControl;
  message = '';


  constructor(private fb: FormBuilder, private postService: PostService, private storageService: StorageService, private route: ActivatedRoute) {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null]
    });
    this.tagControl = new FormControl('');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id) {
        this.postService.getPostById(+id).subscribe(post => {
          this.postForm.patchValue({
            name: post.name,
            content: post.content
          });
          this.tags = post.tags || [];
          this.imageUrl = post.img;
        })
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

  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {

    if (this.storageService.isLoggedIn()) {
      if (this.postForm.valid) {
        const formValue = this.postForm.value;
        formValue.tags = this.tags;
        formValue.img = this.imageUrl || formValue.img;
        this.message = "Form Submitted", formValue;

        const payload = {
          ...formValue,
          tags: formValue.tags
        };

        const postId = this.route.snapshot.paramMap.get("id");
        if (postId) {
          this.postService.editPostById(+postId, payload).subscribe(response => {
            this.message = "Post updated successfully", response;
          }, (error: { message: string; }) => {
            this.message = "Error updating post:" + error.message;
          });
        } else {
          this.message = "Form is invalid. Please check the fields.";
        }
      }
    }
  }
}