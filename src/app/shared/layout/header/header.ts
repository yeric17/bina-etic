import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface NavItem {
  label: string;
  path: string;
  fragment?: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
  animations: [
    trigger('mobileMenu', [
      state('closed', style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      state('open', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('closed <=> open', animate('300ms ease-in-out'))
    ]),
    trigger('fadeInDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Header {
  menuOpen = signal(false);
  isScrolled = signal(false);

  navItems: NavItem[] = [
    { label: 'Inicio', path: '/', fragment: 'hero' },
    { label: 'Servicios', path: '/', fragment: 'servicios' },
    { label: 'Nosotros', path: '/', fragment: 'nosotros' },
    { label: 'Portafolio', path: '/', fragment: 'portafolio' },
    { label: 'Contacto', path: '/', fragment: 'contacto' }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  closeMenu() {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }

  scrollToSection(fragment: string | undefined) {
    if (fragment) {
      const element = document.getElementById(fragment);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    this.closeMenu();
  }
}
