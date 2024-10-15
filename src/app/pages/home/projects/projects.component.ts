import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('path', { static: true }) path!: ElementRef<SVGPathElement>;
  @ViewChild('blog', { static: true }) blogElement!: ElementRef<HTMLElement>;
  @ViewChild('sale', { static: true }) saleElement!: ElementRef<HTMLElement>;
  @ViewChild('arduino', { static: true }) arduinoElement!: ElementRef<HTMLElement>;
  private mouseMoved = false;

  ngAfterViewInit(): void {
    const pathElement = this.path.nativeElement;
    const pathLength = pathElement.getTotalLength();

    // Inicializa os valores de stroke-dasharray e stroke-dashoffset
    pathElement.style.strokeDasharray = `${pathLength}`;
    pathElement.style.strokeDashoffset = `${pathLength}`;

    if (this.path) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.to(pathElement, {
              strokeDashoffset: 0,
              duration: 3,
              ease: 'power2.out'
            });
            observer.unobserve(this.path.nativeElement); // Parar de observar após a animação
          }
        },
        {
          root: null, // A página inteira será o root
          threshold: 0.5 // 50% do elemento deve estar visível para ativar a animação
        }
      );

      observer.observe(this.path.nativeElement);
    }

    window.addEventListener('mousemove', () => {
      this.mouseMoved = true;
    });

    ScrollTrigger.create({
      trigger: this.blogElement.nativeElement,
      start: '-15%',
      end: '80% 100%',
      scrub: true,
      onUpdate: (self) => {
        if (this.mouseMoved) {
          const borderRadiusTop = 50 - self.progress * 100;
          gsap.to(this.blogElement.nativeElement, {
            borderTopLeftRadius: `${borderRadiusTop}%`,
            borderTopRightRadius: `${borderRadiusTop}%`,
            duration: 1.5,
          });
        }
      }
    });

    ScrollTrigger.create({
      trigger: this.saleElement.nativeElement,
      start: '-15%',
      end: '80% 100%',
      scrub: true,
      onUpdate: (self) => {
        if (this.mouseMoved) {
          const borderRadiusTop = 50 - self.progress * 100;
          gsap.to(this.saleElement.nativeElement, {
            borderTopLeftRadius: `${borderRadiusTop}%`,
            borderTopRightRadius: `${borderRadiusTop}%`,
            duration: 1.5,
          });
        }
      }
    });

    ScrollTrigger.create({
      trigger: this.arduinoElement.nativeElement,
      start: '-15%',
      end: '80% 100%',
      scrub: true,
      onUpdate: (self) => {
        if (this.mouseMoved) {
          const borderRadiusTop = 50 - self.progress * 100;
          gsap.to(this.arduinoElement.nativeElement, {
            borderTopLeftRadius: `${borderRadiusTop}%`,
            borderTopRightRadius: `${borderRadiusTop}%`,
            duration: 1.5,
          });
        }
      }
    });
  }
}