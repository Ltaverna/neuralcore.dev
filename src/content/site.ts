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
    es: { title: 'Cloud Platforms', desc: 'Bases cloud-native seguras, escalables y reproducibles por defecto.' },
    en: { title: 'Cloud Platforms', desc: 'Cloud-native foundations that are secure, scalable and reproducible by default.' },
  },
  {
    tag: 'data',
    capabilities: [
      'Data Lakes',
      'Data Warehouses',
      'Lakehouse',
      'Data Engineering',
      'Real-Time Processing',
      'Analytics',
      'Data Governance',
    ],
    es: { title: 'Data Platforms', desc: 'Lakehouses y pipelines que convierten datos crudos en productos gobernados y en tiempo real.' },
    en: { title: 'Data Platforms', desc: 'Lakehouses and pipelines that turn raw data into governed, real-time products.' },
  },
  {
    tag: 'platform',
    capabilities: [
      'Developer Platforms',
      'CI/CD',
      'Observability',
      'Reliability Engineering',
      'Golden Paths',
    ],
    es: { title: 'Platform Engineering', desc: 'Plataformas internas con golden paths, CI/CD y observabilidad incorporada.' },
    en: { title: 'Platform Engineering', desc: 'Internal developer platforms with golden paths, CI/CD and built-in observability.' },
  },
  {
    tag: 'ai',
    capabilities: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'NLP & LLMs',
      'AI Agents',
      'RAG Systems',
    ],
    es: { title: 'Inteligencia Artificial', desc: 'IA en producción: de ML clásico a sistemas LLM, agentes y retrieval.' },
    en: { title: 'Artificial Intelligence', desc: 'Production AI — from classical ML to LLM systems, agents and retrieval.' },
  },
  {
    tag: 'mlops',
    capabilities: [
      'Model Training',
      'Feature Stores',
      'Model Serving',
      'Monitoring',
      'Model Registry',
      'CI/CD for ML',
    ],
    es: { title: 'MLOps', desc: 'El ciclo que mantiene tus modelos fiables en producción: entrenar, servir, monitorear, reentrenar.' },
    en: { title: 'MLOps', desc: 'The lifecycle that keeps models reliable in production: train, serve, monitor, retrain.' },
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
    es: { title: 'operate', desc: 'medir, escalar y mantener' },
    en: { title: 'operate', desc: 'measure, scale and run' },
  },
];

// NOTE: placeholder cases — real project copy + metrics to be supplied by the user.
export const cases: CaseItem[] = [
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
  'TypeScript',
  'PyTorch',
  'Databricks',
  'Spark',
  'Airflow',
  'Azure',
  'Google Cloud',
  'Kubernetes',
  'Terraform',
  'PostgreSQL',
];
