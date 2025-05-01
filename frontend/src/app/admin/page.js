// frontend/src/app/admin/page.js
import { Suspense } from 'react';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';
import styles from './page.module.css';

export const metadata = {
  robots: 'noindex, nofollow',
  title: 'Admin Dashboard - Apollo 24/7 Clone',
};

export default function AdminPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Admin Dashboard</h1>
        
        <Suspense fallback={<div>Loading dashboard...</div>}>
          <AdminDashboard />
        </Suspense>
      </div>
    </main>
  );
}