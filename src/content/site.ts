export interface Service {
  tag: string;
  es: { title: string; desc: string };
  en: { title: string; desc: string };
}

export interface ProcessStep {
  n: string;
  es: { title: string; desc: string };
  en: { title: string; desc: string };
}

export interface CaseItem {
  metric: string;
  gradient: string;
  es: { title: string };
  en: { title: string };
}

export const services: Service[] = [
  {
    tag: 'ml',
    es: { title: 'Machine Learning', desc: 'LLMs, visión, agentes y modelos a medida.' },
    en: { title: 'Machine Learning', desc: 'LLMs, vision, agents and custom models.' },
  },
  {
    tag: 'data',
    es: { title: 'Data Engineering', desc: 'Pipelines, warehouses y analytics.' },
    en: { title: 'Data Engineering', desc: 'Pipelines, warehouses and analytics.' },
  },
  {
    tag: 'sw',
    es: { title: 'Software', desc: 'Apps web, APIs, productos y MVPs.' },
    en: { title: 'Software', desc: 'Web apps, APIs, products and MVPs.' },
  },
  {
    tag: 'cloud',
    es: { title: 'Cloud / DevOps', desc: 'Infra, MLOps y escalabilidad.' },
    en: { title: 'Cloud / DevOps', desc: 'Infra, MLOps and scalability.' },
  },
];

export const processSteps: ProcessStep[] = [
  {
    n: '01',
    es: { title: 'discovery', desc: 'entender el reto' },
    en: { title: 'discovery', desc: 'understand the challenge' },
  },
  {
    n: '02',
    es: { title: 'build', desc: 'prototipar y construir' },
    en: { title: 'build', desc: 'prototype and build' },
  },
  {
    n: '03',
    es: { title: 'ship', desc: 'a producción' },
    en: { title: 'ship', desc: 'to production' },
  },
  {
    n: '04',
    es: { title: 'scale', desc: 'medir y escalar' },
    en: { title: 'scale', desc: 'measure and scale' },
  },
];

// NOTE: placeholder cases — real project copy + metrics to be supplied by the user.
export const cases: CaseItem[] = [
  {
    metric: '+18% yield',
    gradient: 'linear-gradient(135deg,#0a1a06,#1a2e0a)',
    es: { title: 'Predicción agro' },
    en: { title: 'Crop prediction' },
  },
  {
    metric: '-60% costo',
    gradient: 'linear-gradient(135deg,#06121a,#0a2433)',
    es: { title: 'Pipeline de datos' },
    en: { title: 'Data pipeline' },
  },
  {
    metric: '0→prod 8sem',
    gradient: 'linear-gradient(135deg,#1a1206,#332406)',
    es: { title: 'Plataforma SaaS' },
    en: { title: 'SaaS platform' },
  },
];

export const stack: string[] = [
  'Python',
  'PyTorch',
  'AWS',
  'PostgreSQL',
  'Docker',
  'React',
];
