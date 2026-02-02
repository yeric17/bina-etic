import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ContactService } from '../../../../core/services/contact.service';
import { ContactFormData } from '../../../../core/interfaces/email.interface';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface Project {
  title: string;
  category: string;
  technologies: string[];
  gradient: string;
}



@Component({
  selector: 'app-home-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  private platformId = inject(PLATFORM_ID);
  // private contactService = inject(ContactService);
  
  // Visibility signals for scroll animations
  heroVisible = signal(true);
  servicesVisible = signal(false);
  aboutVisible = signal(false);
  portfolioVisible = signal(false);
  contactVisible = signal(false);

  // Animated counter values
  animatedStats = signal<number[]>([0, 0, 0]);
  
  // Contact form state
  isSubmitting = signal(false);
  submitMessage = signal<string>('');
  submitSuccess = signal<boolean>(false);

  services: Service[] = [
    {
      icon: 'pi-box',
      title: 'Software ERP',
      description: 'Implementamos soluciones ERP, desde plataformas probadas hasta desarrollos 100% a medida, adaptados a tus procesos.'
    },
    {
      icon: 'pi-globe',
      title: 'Desarrollo Web',
      description: 'Creamos aplicaciones web modernas, escalables y de alto rendimiento utilizando las últimas tecnologías del mercado.'
    },
    {
      icon: 'pi-comments',
      title: 'Consultoría',
      description: 'Asesoramos a tu empresa en la transformación digital y la adopción de mejores prácticas tecnológicas.'
    },
    {
      icon: 'pi-sync',
      title: 'Automatizaciones',
      description: 'Ahorramos tiempo automatizando procesos repetitivos, reduciendo errores y mejorando la eficiencia operativa potenciandolo con IA'
    }
  ];

  stats: Stat[] = [
    { value: 8, suffix: '+', label: 'Años de experiencia' },
    { value: 50, suffix: '+', label: 'Proyectos completados' },
    { value: 30, suffix: '+', label: 'Clientes satisfechos' }
  ];

  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      category: 'Desarrollo Web',
      technologies: ['Angular', 'Node.js', 'MongoDB'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'ERP Manufacturing',
      category: 'Software ERP',
      technologies: ['Odoo', 'Python', 'PostgreSQL'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Logistics Dashboard',
      category: 'Automatizaciones',
      technologies: ['React', 'Python', 'AWS'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Healthcare System',
      category: 'Consultoría',
      technologies: ['Angular', '.NET', 'Azure'],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      title: 'Inventory Manager',
      category: 'Software ERP',
      technologies: ['Odoo', 'Python', 'Docker'],
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      title: 'CRM Solution',
      category: 'Desarrollo Web',
      technologies: ['Vue.js', 'Laravel', 'MySQL'],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  contactForm: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          switch (sectionId) {
            case 'servicios':
              this.servicesVisible.set(true);
              break;
            case 'nosotros':
              this.aboutVisible.set(true);
              this.animateCounters();
              break;
            case 'portafolio':
              this.portfolioVisible.set(true);
              break;
            case 'contacto':
              this.contactVisible.set(true);
              break;
          }
        }
      });
    }, options);

    // Observe sections after a small delay to ensure DOM is ready
    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => observer.observe(section));
    }, 100);
  }

  private animateCounters() {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      this.animatedStats.set(
        this.stats.map(stat => Math.round(stat.value * easeOutProgress))
      );

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
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

  onSubmit() {
    
  }
}
