/**
 * Technologies Data
 * Archivo de configuración para las tecnologías mostradas en la página de inicio.
 * Para agregar una nueva tecnología, simplemente añade un nuevo objeto al array.
 */

export interface Technology {
  name: string;
  image: string;
  alt: string;
}

export const TECHNOLOGIES: Technology[] = [
  {
    name: 'Angular',
    image: 'tecnologies/angular.png',
    alt: 'Angular Logo'
  },
  {
    name: 'AWS',
    image: 'tecnologies/aws.webp',
    alt: 'AWS Logo'
  },
  {
    name: 'GitHub',
    image: 'tecnologies/github.jpg',
    alt: 'GitHub Logo'
  },
  {
    name: '.NET',
    image: 'tecnologies/net.svg',
    alt: '.NET Logo'
  },
  {
    name: 'Odoo',
    image: 'tecnologies/odoo_logo.png',
    alt: 'Odoo Logo'
  },
  {
    name: 'PostgreSQL',
    image: 'tecnologies/postgresql.jpg',
    alt: 'PostgreSQL Logo'
  }
];
