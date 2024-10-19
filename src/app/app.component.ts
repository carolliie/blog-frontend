import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './pages/_services/auth.service';
import { StorageService } from './pages/_services/storage.service';
import { EventBusService } from './pages/_shared/event-bus.service';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FooterComponent } from "./pages/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule, FormsModule, EditorModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blogWeb'; private role: any;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  isAnimating = false;
  menuVisible = false;
  username?: string;

  eventBusSub?: Subscription;

  readonly TARGET_TEXT = "LINKEDIN";
  readonly TARGET_TEXT2 = "GITHUB";
  readonly CYCLES_PER_LETTER = 2;
  readonly SHUFFLE_TIME = 100;
  readonly CHARS = "!@#$%^&*():{};|,.<>/?";

  text: string = this.TARGET_TEXT;
  text2: string = this.TARGET_TEXT2;
  intervalRefLinkedin: any = null;
  intervalRefGithub: any = null;

  @ViewChild('encryptButton') encryptButton!: ElementRef;
  @ViewChild('encryptButton2') encryptButton2!: ElementRef;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = user.role;

      this.showAdminBoard = this.role.includes('admin');
      this.showModeratorBoard = this.role.includes('user');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  scrambleLinkedin() {
    let pos = 0;
    this.clearIntervalLinkedin();

    this.intervalRefLinkedin = setInterval(() => {
      const scrambled = this.TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / this.CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * this.CHARS.length);
          const randomChar = this.CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      this.text = scrambled;
      pos++;

      if (pos >= this.TARGET_TEXT.length * this.CYCLES_PER_LETTER) {
        this.stopScrambleLinkedin();
      }
    }, this.SHUFFLE_TIME);
  }

  scrambleGithub() {
    let pos = 0;
    this.clearIntervalGithub();

    this.intervalRefGithub = setInterval(() => {
      const scrambled = this.TARGET_TEXT2.split("")
        .map((char, index) => {
          if (pos / this.CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * this.CHARS.length);
          const randomChar = this.CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      this.text2 = scrambled;
      pos++;

      if (pos >= this.TARGET_TEXT2.length * this.CYCLES_PER_LETTER) {
        this.stopScrambleGithub();
      }
    }, this.SHUFFLE_TIME);
  }

  stopScrambleLinkedin() {
    this.clearIntervalLinkedin();
    this.text = this.TARGET_TEXT;
  }

  stopScrambleGithub() {
    this.clearIntervalGithub();
    this.text2 = this.TARGET_TEXT2;
  }

  clearIntervalLinkedin() {
    if (this.intervalRefLinkedin) {
      clearInterval(this.intervalRefLinkedin);
      this.intervalRefLinkedin = null;
    }
  }

  clearIntervalGithub() {
    if (this.intervalRefGithub) {
      clearInterval(this.intervalRefGithub);
      this.intervalRefGithub = null;
    }
  }

  showMenu() {
    if (this.menuVisible = !this.menuVisible) {
      this.isAnimating = false;
      this.menuVisible = true;
    } else {
      this.isAnimating = true;

      setTimeout(() => {
        this.menuVisible = false;
        this.isAnimating = false;
      }, 500);
    }

  }

  hideMenu() {
    this.isAnimating = true;

    setTimeout(() => {
      this.menuVisible = false;
      this.isAnimating = false;
    }, 500)
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
