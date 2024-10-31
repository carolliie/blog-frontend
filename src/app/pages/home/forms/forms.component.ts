import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  contactForm: FormGroup;
  name!: string;
  email!: string;
  message!: string;
  log = "";
  isSubmitting = false;

  constructor(
    private fb: FormBuilder, private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.maxLength(250)]]
    });
  }

  onSubmit():void {
    this.isSubmitting = true;
    if (!this.contactForm.valid) {
      this.log = "Form is invalid. Please check the fields.";
      return;
    }

    if (this.contactForm.valid) {
      this.http.post('https://blog-backend-production-f7e6.up.railway.app/api/send-email', this.contactForm.value, { responseType: 'text' })
        .subscribe(
          (res: any) => {
            this.log = res;
          }, 
          (error) => {
            this.log = 'Erro ao enviar o e-mail. Tente novamente mais tarde.';
          }
        );
    }
  }
}
