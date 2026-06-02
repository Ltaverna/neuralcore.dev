export interface Service {
  tag: string;
  capabilities: string[];
  es: { title: string; desc: string };
  en: { title: string; desc: string };
}

export interface ProcessStep {
  n: string;
  es: { title: string; desc: string };
  en: { title: string; desc: string };
}

export interface CaseItem {
  gradient: string;
  es: { title: string; metric: string };
  en: { title: string; metric: string };
}

export const services: Service[] = [
  {
    tag: 'ai',
    capabilities: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'NLP & LLMs',
      'AI Agents',
      'RAG Systems',
      'MLOps',
    ],
    es: { title: 'Inteligencia Artificial', desc: 'Modelos que entienden, ven y razonan — del prototipo a producción.' },
    en: { title: 'Artificial Intelligence', desc: 'Models that understand, see and reason — from prototype to production.' },
  },
  {
    tag: 'cloud',
    capabilities: [
      'Cloud Native',
      'Azure',
      'Google Cloud',
      'Kubernetes',
      'Containers',
      'Serverless',
      'Infrastructure as Code',
    ],
    es: { title: 'Cloud Engineering', desc: 'Arquitecturas cloud-native escalables y reproducibles.' },
    en: { title: 'Cloud Engineering', desc: 'Scalable, reproducible cloud-native architectures.' },
  },
  {
    tag: 'data',
    capabilities: [
      'Data Lakes',
      'Data Warehouses',
      'Data Engineering',
      'Real-Time Processing',
      'Analytics',
      'Data Governance',
    ],
    es: { title: 'Data Platforms', desc: 'De datos crudos a decisiones, en tiempo real.' },
    en: { title: 'Data Platforms', desc: 'From raw data to decisions, in real time.' },
  },
  {
    tag: 'platform',
    capabilities: [
      'Developer Platforms',
      'CI/CD',
      'Observability',
      'Reliability Engineering',
    ],
    es: { title: 'Platform Engineering', desc: 'Plataformas internas que aceleran a tus equipos.' },
    en: { title: 'Platform Engineering', desc: 'Internal platforms that accelerate your teams.' },
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
    gradient: 'linear-gradient(135deg,#0a1a06,#1a2e0a)',
    es: { title: 'Predicción agro', metric: '+18% rinde' },
    en: { title: 'Crop prediction', metric: '+18% yield' },
  },
  {
    gradient: 'linear-gradient(135deg,#06121a,#0a2433)',
    es: { title: 'Pipeline de datos', metric: '-60% costo' },
    en: { title: 'Data pipeline', metric: '-60% cost' },
  },
  {
    gradient: 'linear-gradient(135deg,#1a1206,#332406)',
    es: { title: 'Plataforma SaaS', metric: '0→prod 8 sem' },
    en: { title: 'SaaS platform', metric: '0→prod 8 wks' },
  },
];

export const stack: string[] = [
  'Python',
  'PyTorch',
  'TypeScript',
  'Azure',
  'Google Cloud',
  'Kubernetes',
  'Terraform',
  'PostgreSQL',
];
