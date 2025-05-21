// frontend/src/app/specialties/general-physician-internal-medicine/page.js
import { Suspense } from 'react';
import Header from '@/components/Header/Header';
import DoctorListing from '@/components/DoctorListing/DoctorListing';
import styles from './page.module.css';
import Link from 'next/link';

// Metadata for SEO
export const metadata = {
  title: 'Consult General Physicians Online - Internal Medicine Specialists | Apollo 24/7',
  description: 'Consult with experienced general physicians and internal medicine specialists online. Book appointments with qualified doctors at Apollo 24/7.',
  keywords: 'general physician, internal medicine, online consultation, doctor appointment, Apollo 24/7',
  openGraph: {
    title: 'Consult General Physicians Online - Internal Medicine Specialists | Apollo 24/7',
    description: 'Consult with experienced general physicians and internal medicine specialists online. Book appointments with qualified doctors at Apollo 24/7.',
    images: [{ url: '/og-image.jpg' }],
    type: 'website',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.apollo247.com/specialties/general-physician-internal-medicine',
  }
};

export default function GeneralPhysicianPage() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> &gt; <Link href="/doctors">Doctors</Link> &gt; General Physicians
        </div>
        
        <h1 className={styles.pageTitle}>
          Consult General Physicians Online - Internal Medicine Specialists
        </h1>
        
        <Suspense fallback={<div>Loading doctors...</div>}>
          <DoctorListing specialty="General Physician" />
        </Suspense>
      </div>
    </main>
  );
}