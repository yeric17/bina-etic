import { Component, signal, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  path: string;
  fragment?: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menuOpen = signal(false);
  isScrolled = signal(false);

  navItems: NavItem[] = [
    { label: 'Inicio', path: '/', fragment: 'hero' },
    { label: 'Servicios', path: '/', fragment: 'servicios' },
    { label: 'Nosotros', path: '/', fragment: 'nosotros' },
    // { label: 'Portafolio', path: '/', fragment: 'portafolio' },
    { label: 'Contacto', path: '/', fragment: 'contacto' }
  ];

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Use requestAnimationFrame for better performance on mobile
    requestAnimationFrame(() => {
      this.isScrolled.set(window.scrollY > 50);
    });
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
    // Prevent body scroll when menu is open with better mobile handling
    if (this.menuOpen()) {
      // Store current scroll position before fixing body
      const currentScrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${currentScrollY}px`;
      // Store scroll position on the body element for later retrieval
      document.body.dataset['scrollY'] = currentScrollY.toString();
    } else {
      // Restore scroll position from stored data
      const scrollY = document.body.dataset['scrollY'];
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      delete document.body.dataset['scrollY'];
      
      // Only restore scroll if we actually had a scroll position stored
      if (scrollY && scrollY !== '0') {
        window.scrollTo(0, parseInt(scrollY));
      }
    }
  }

  closeMenu() {
    const wasOpen = this.menuOpen();
    this.menuOpen.set(false);
    
    if (wasOpen) {
      // Restore scroll position from stored data
      const scrollY = document.body.dataset['scrollY'];
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      delete document.body.dataset['scrollY'];
      
      // Only restore scroll if we actually had a scroll position stored
      if (scrollY && scrollY !== '0') {
        window.scrollTo(0, parseInt(scrollY));
      }
    }
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
