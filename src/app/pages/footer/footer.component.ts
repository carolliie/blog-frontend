import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit {
  readonly TEXT_DEV = ".dev";

  readonly TARGET_TEXT = "LINKEDIN";
  readonly TARGET_TEXT2 = "GITHUB";
  readonly CYCLES_PER_LETTER = 2;
  readonly SHUFFLE_TIME = 100;
  readonly CHARS = "!@#$%^&*():{};|,.<>/?";

  text: string = this.TARGET_TEXT;
  text2: string = this.TARGET_TEXT2;
  textDev: string = "";
  intervalRefLinkedin: any = null;
  intervalRefGithub: any = null;

  @ViewChild('encryptButton') encryptButton!: ElementRef;
  @ViewChild('encryptButton2') encryptButton2!: ElementRef;
  @ViewChild('footer', { static: false }) footer!: ElementRef;

  index: number = 0;
  typingSpeed: number = 300;

  ngAfterViewInit() {
    if (this.footer) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.typingText();
            observer.unobserve(this.footer.nativeElement); // Parar de observar após a animação
          }
        },
        {
          root: null, // A página inteira será o root
          threshold: 0.5 // 50% do elemento deve estar visível para ativar a animação
        }
      );

      observer.observe(this.footer.nativeElement);
    }
  }
  
  typingText() {
    if (this.index < this.TEXT_DEV.length) {
      this.textDev += this.TEXT_DEV[this.index];

      this.index++;

      setTimeout(() => {
        this.typingText();
      }, this.typingSpeed);
    }
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
}
