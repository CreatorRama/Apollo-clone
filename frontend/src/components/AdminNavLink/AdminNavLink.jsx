'use client';

import Link from 'next/link';
import styles from './AdminNavLink.module.css';

const AdminNavLink = () => {
  return (
    <Link href="/admin" className={styles.adminLink}>
      Admin Dashboard
    </Link>
  );
};

export default AdminNavLink;