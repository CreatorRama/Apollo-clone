// frontend/src/components/DoctorCard/DoctorCard.jsx
import Image from 'next/image';
import styles from './DoctorCard.module.css';
import React from 'react';


const DoctorCard = ({ doctor }) => {
  

  return (
    <div className={styles.doctorCard}>
    
      <div className={styles.doctorImageContainer}>
        <Image 
          src="/assets/images/default-doctor.webp"
          alt={doctor.name || 'Doctor profile'}
          width={80}
          height={80}
          className={styles.doctorImage}
        />
        {doctor.ratings && doctor.ratings.percentage > 0 && (
          <div className={styles.ratingContainer}>
            <div className={styles.ratingPercentage}>
              <span className={styles.thumbsUp}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"></path>
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </span>
              {doctor.ratings.percentage}%
            </div>
            {doctor.ratings.totalPatients > 0 && (
              <div className={styles.totalPatients}>
                ({doctor.ratings.totalPatients}+ Patients)
              </div>
            )}
          </div>
        )}
      </div>
      
      
      <div className={styles.doctorInfo}>
        <div className={styles.doctorNameContainer}>
          <h3 className={styles.doctorName}>
            {doctor.name}
            {doctor.verified && (
              <span className={styles.verifiedIcon} title="Verified">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </span>
            )}
          </h3>
          {doctor.doctorOfTheHour && (
            <span className={styles.doctorOfHour}>DOCTOR OF THE HOUR</span>
          )}
        </div>
        
        <p className={styles.specialty}>{doctor.title}</p>
        
        <div className={styles.qualifications}>
          {doctor.experience && doctor.experience.years > 0 && (
            <span className={styles.experience}>{doctor.experience.years} YEARS</span>
          )}
          {doctor.qualifications && doctor.qualifications.map((qual, index) => (
            <span key={index} className={styles.qualification}>
              {qual}
              {index < doctor.qualifications.length - 1 && ', '}
            </span>
          ))}
        </div>
        
        <p className={styles.location}>
          {doctor.facility}
          {doctor.location && doctor.location.city && ` - ${doctor.location.state}, ${doctor.location.city}`}
        </p>
      </div>
       
      <div className={styles.doctorAction}>
        <div className={styles.consultFee}>
          <span className={styles.rupeeSymbol}>₹</span>
          {doctor.fees && doctor.fees.amount}
          {doctor.fees && doctor.fees.cashback && doctor.fees.cashback.applicable && (
            <div className={styles.cashback}>
              <div className={styles.coinIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              ₹{doctor.fees.cashback.amount} Cashback
            </div>
          )}
        </div>
        
        <button className={styles.consultButton}>
          Consult Online
          {doctor.availability && doctor.availability.online && doctor.availability.online.waitTime && (
            <span className={styles.waitTime}>
              Available in {doctor.availability.online.waitTime} minutes
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default React.memo(DoctorCard)