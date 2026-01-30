import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface FooterLink {
  label: string;
  path: string;
  fragment?: string;
}

interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  navLinks: FooterLink[] = [
    { label: 'Inicio', path: '/', fragment: 'hero' },
    { label: 'Servicios', path: '/', fragment: 'servicios' },
    { label: 'Nosotros', path: '/', fragment: 'nosotros' },
    // { label: 'Portafolio', path: '/', fragment: 'portafolio' },
    { label: 'Contacto', path: '/', fragment: 'contacto' }
  ];

  services: string[] = [
    'Desarrollo Web',
    'Software ERP',
    'Consultoría',
    'Automatizaciones'
  ];

  socialLinks: SocialLink[] = [
    // { icon: 'pi-linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
    // { icon: 'pi-github', url: 'https://github.com', label: 'GitHub' },
    // { icon: 'pi-twitter', url: 'https://twitter.com', label: 'Twitter' },
    // { icon: 'pi-instagram', url: 'https://instagram.com', label: 'Instagram' }
  ];

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
  }
}
