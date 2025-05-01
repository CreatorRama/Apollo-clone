
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import AdminNavLink from '../AdminNavLink/AdminNavLink';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/">
            <Image 
              src="/apollo-24-7-logo.png" 
              alt="Apollo 24/7" 
              width={124} 
              height={48} 
              priority
            />
          </Link>
        </div>
        
       
        <div className={styles.locationSelector}>
          <div className={styles.locationIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div className={styles.locationText}>
            <span>Select Location</span>
            <div className={styles.addressDropdown}>
              Select Address <span>▼</span>
            </div>
          </div>
        </div>
        
       
        <div className={styles.search}>
          <div className={styles.searchIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search Doctors, Specialities, Conditions etc." 
            className={styles.searchInput}
          />
        </div>
        
       
        <div className={styles.loginButton}>
        <AdminNavLink />
          <button className={styles.login}>
            Login
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>
      
     
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/medicines">Buy Medicines</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/#" className={styles.active}>Find Doctors</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/#">Lab Tests</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/#">Circle Membership</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/#">Health Records</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/#">Diabetes Reversal</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/#">
                Buy Insurance <span className={styles.newBadge}>New</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;