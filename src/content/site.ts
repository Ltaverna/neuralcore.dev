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

interface CaseContent {
  title: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface CaseStudy {
  tag: string;
  es: CaseContent;
  en: CaseContent;
}

export const services: Service[] = [
  {
    tag: 'cloud',
    es: { title: 'Cloud Platforms', desc: 'Bases cloud-native seguras, escalables y reproducibles por defecto.' },
    en: { title: 'Cloud Platforms', desc: 'Cloud-native foundations that are secure, scalable and reproducible by default.' },
  },
  {
    tag: 'data',
    es: { title: 'Data Platforms', desc: 'Lakehouses y pipelines que convierten datos crudos en productos gobernados y en tiempo real.' },
    en: { title: 'Data Platforms', desc: 'Lakehouses and pipelines that turn raw data into governed, real-time products.' },
  },
  {
    tag: 'platform',
    es: { title: 'Platform Engineering', desc: 'Plataformas internas con golden paths, CI/CD y observabilidad incorporada.' },
    en: { title: 'Platform Engineering', desc: 'Internal developer platforms with golden paths, CI/CD and built-in observability.' },
  },
  {
    tag: 'ai',
    es: { title: 'Inteligencia Artificial', desc: 'IA en producción: de ML clásico a sistemas LLM, agentes y retrieval.' },
    en: { title: 'Artificial Intelligence', desc: 'Production AI — from classical ML to LLM systems, agents and retrieval.' },
  },
  {
    tag: 'mlops',
    es: { title: 'MLOps', desc: 'El ciclo que mantiene tus modelos fiables en producción: entrenar, servir, monitorear, reentrenar.' },
    en: { title: 'MLOps', desc: 'The lifecycle that keeps models reliable in production: train, serve, monitor, retrain.' },
  },
];

// Broader expertise areas (enterprise framing) — shown above the condensed tech list.
export const areasOfExpertise: string[] = [
  'Cloud Architecture',
  'Platform Engineering',
  'Data Platforms',
  'Artificial Intelligence',
  'Machine Learning',
  'MLOps',
  'Enterprise Integration',
  'DevOps & SRE',
  'Distributed Systems',
  'Cloud FinOps',
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

export const caseStudies: CaseStudy[] = [
  {
    tag: 'data',
    es: {
      title: 'Plataforma de Datos Empresarial',
      challenge: 'Una arquitectura fragmentada, con múltiples fuentes de datos y procesos manuales.',
      solution: 'Plataforma cloud-native sobre Azure y GCP con procesamiento distribuido, automatización y observabilidad centralizada.',
      results: ['50+ TB procesados al mes', '90% menos tareas manuales', 'Multi-cloud Azure + GCP'],
    },
    en: {
      title: 'Enterprise Data Platform',
      challenge: 'A fragmented architecture with many data sources and manual processes.',
      solution: 'A cloud-native platform on Azure and GCP with distributed processing, automation and centralized observability.',
      results: ['50+ TB processed monthly', '90% fewer manual tasks', 'Multi-cloud Azure + GCP'],
    },
  },
  {
    tag: 'mlops',
    es: {
      title: 'Plataforma de Inteligencia Artificial',
      challenge: 'Llevar modelos de Machine Learning desde la experimentación hasta producción de forma confiable.',
      solution: 'Pipelines MLOps completos: entrenamiento, validación, despliegue y monitoreo automatizados.',
      results: ['Despliegue de semanas a horas', 'Modelos monitoreados en tiempo real', 'ML en producción para múltiples clientes'],
    },
    en: {
      title: 'AI / MLOps Platform',
      challenge: 'Taking machine learning models from experimentation to reliable production.',
      solution: 'End-to-end MLOps pipelines automating training, validation, deployment and monitoring.',
      results: ['Deployment from weeks to hours', 'Models monitored in real time', 'Production ML for multiple clients'],
    },
  },
  {
    tag: 'finops',
    es: {
      title: 'Optimización de Costos Cloud',
      challenge: 'Infraestructura sobredimensionada, con costos crecientes y baja visibilidad operativa.',
      solution: 'Análisis FinOps, optimización de recursos y automatización de escalado — incluyendo la eliminación de revisiones zombie en Cloud Run.',
      results: ['USD 19.500/año de ahorro', 'Mejor utilización de recursos', 'Mayor previsibilidad presupuestaria'],
    },
    en: {
      title: 'Cloud Cost Optimization (FinOps)',
      challenge: 'Oversized infrastructure with rising costs and poor operational visibility.',
      solution: 'FinOps analysis, resource right-sizing and scaling automation — including removing zombie Cloud Run revisions.',
      results: ['USD 19,500/year saved', 'Better resource utilization', 'More predictable budgeting'],
    },
  },
  {
    tag: 'cloud',
    es: {
      title: 'Arquitectura Cloud para Plataforma SaaS',
      challenge: 'Construir una plataforma escalable capaz de soportar un crecimiento acelerado.',
      solution: 'Arquitectura sobre Kubernetes, servicios administrados y despliegues automatizados.',
      results: ['Alta disponibilidad', 'Despliegues continuos sin interrupciones', 'Autoescalado horizontal'],
    },
    en: {
      title: 'Cloud Architecture for a SaaS Platform',
      challenge: 'Building a scalable platform able to support accelerated growth.',
      solution: 'A Kubernetes-based architecture with managed services and automated deployments.',
      results: ['High availability', 'Continuous, zero-downtime deployments', 'Automatic horizontal scaling'],
    },
  },
  {
    tag: 'genai',
    es: {
      title: 'Plataforma de IA Generativa',
      challenge: 'Integrar capacidades de IA generativa dentro de procesos de negocio existentes.',
      solution: 'Agentes inteligentes, RAG y arquitecturas basadas en LLMs.',
      results: ['100.000+ requests diarios', 'Automatización de procesos complejos', 'Menor tiempo de respuesta'],
    },
    en: {
      title: 'Generative AI Platform',
      challenge: 'Embedding generative AI capabilities into existing business processes.',
      solution: 'Intelligent agents, RAG and LLM-based architectures.',
      results: ['100,000+ daily requests', 'Automation of complex processes', 'Lower response times'],
    },
  },
  {
    tag: 'bigdata',
    es: {
      title: 'Procesamiento Distribuido de Grandes Volúmenes',
      challenge: 'Procesar decenas de terabytes de información de forma eficiente y económica.',
      solution: 'Arquitectura distribuida con Spark, BigQuery y servicios serverless.',
      results: ['90 h → 5 h de procesamiento', 'Costos operativos mucho menores', 'Análisis casi en tiempo real'],
    },
    en: {
      title: 'Large-Scale Distributed Data Processing',
      challenge: 'Processing tens of terabytes of data efficiently and cost-effectively.',
      solution: 'A distributed architecture using Spark, BigQuery and serverless services.',
      results: ['90h → 5h processing time', 'Much lower operational cost', 'Near real-time analysis'],
    },
  },
];

export const stack: string[] = [
  'Azure',
  'Google Cloud',
  'Kubernetes',
  'Spark',
  'Databricks',
  'BigQuery',
  'Vertex AI',
  'Azure AI',
  'TensorFlow',
  'PyTorch',
  'Apache NiFi',
  'Airflow',
  'Terraform',
  'Docker',
  'Python',
  'Scala',
];
