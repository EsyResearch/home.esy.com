import ExtendedSchoolYearClient from './client';

export const metadata = {
  title: 'Extended School Year (ESY) Guide - Special Education | Esy',
  description: 'Comprehensive guide to Extended School Year (ESY) services. Learn about eligibility, IEP planning, and educational support for students with special needs.',
  keywords: 'extended school year, ESY, special education, IEP, summer school, educational support, disability services',
  openGraph: {
    title: 'Extended School Year (ESY) Guide | Esy',
    description: 'Everything you need to know about Extended School Year services for special education students.',
    type: 'article',
  },
}

export default function Page() {
  return <ExtendedSchoolYearClient />;
}