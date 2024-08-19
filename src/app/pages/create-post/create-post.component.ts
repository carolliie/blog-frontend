import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  standalone: true,  
  imports: [CommonModule, ReactiveFormsModule] 
})
export class CreatePostComponent {
  postForm: FormGroup;
  tags: string[] = [];
  tagControl: FormControl;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, Validators.required],
      posted_by: [null, Validators.required]
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
    if (this.postForm.valid) {
      const formValue = this.postForm.value;
      formValue.tags = this.tags;  // Inclui as tags no valor do formulário
      console.log('Form Submitted', formValue);

      const payload = {
        ...formValue,
        posted_by: formValue.posted_by,
        tags: formValue.tags
      };

      // Aqui você pode chamar um método do PostService para processar os dados do formulário
      this.postService.createNewPost(payload).subscribe(response => {
        console.log('Post created successfully', response);
      });
    }
  }
}