
'use client';

import React from 'react';
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (category, value) => {
    onFilterChange(category, value);
  };

  return (
    <div className={styles.filterSidebar}>
      
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Mode of Consult</h3>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="hospital-visit"
            checked={filters.consultMode.includes('hospital')}
            onChange={() => handleCheckboxChange('consultMode', 'hospital')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="hospital-visit" className={styles.filterLabel}>Hospital Visit</label>
        </div>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="online-consult"
            checked={filters.consultMode.includes('online')}
            onChange={() => handleCheckboxChange('consultMode', 'online')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="online-consult" className={styles.filterLabel}>Online Consult</label>
        </div>
      </div>

      
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Experience (In Years)</h3>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="exp-0-5"
            checked={filters.experience.includes('0-5')}
            onChange={() => handleCheckboxChange('experience', '0-5')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="exp-0-5" className={styles.filterLabel}>0-5</label>
        </div>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="exp-6-10"
            checked={filters.experience.includes('6-10')}
            onChange={() => handleCheckboxChange('experience', '6-10')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="exp-6-10" className={styles.filterLabel}>6-10</label>
        </div>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="exp-11-16"
            checked={filters.experience.includes('11-16')}
            onChange={() => handleCheckboxChange('experience', '11-16')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="exp-11-16" className={styles.filterLabel}>11-16</label>
        </div>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="exp-17+"
            checked={filters.experience.includes('17+')}
            onChange={() => handleCheckboxChange('experience', '17+')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="exp-17+" className={styles.filterLabel}>17+</label>
        </div>
        
        <div className={styles.showMore}>+1 More</div>
      </div>

      
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Fees (In Rupees)</h3>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="fees-100-500"
            checked={filters.fees.includes('100-500')}
            onChange={() => handleCheckboxChange('fees', '100-500')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="fees-100-500" className={styles.filterLabel}>100-500</label>
        </div>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="fees-500-1000"
            checked={filters.fees.includes('500-1000')}
            onChange={() => handleCheckboxChange('fees', '500-1000')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="fees-500-1000" className={styles.filterLabel}>500-1000</label>
        </div>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="fees-1000+"
            checked={filters.fees.includes('1000+')}
            onChange={() => handleCheckboxChange('fees', '1000+')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="fees-1000+" className={styles.filterLabel}>1000+</label>
        </div>
      </div>

     
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Language</h3>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="lang-english"
            checked={filters.language.includes('English')}
            onChange={() => handleCheckboxChange('language', 'English')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="lang-english" className={styles.filterLabel}>English</label>
        </div>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="lang-hindi"
            checked={filters.language.includes('Hindi')}
            onChange={() => handleCheckboxChange('language', 'Hindi')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="lang-hindi" className={styles.filterLabel}>Hindi</label>
        </div>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="lang-telugu"
            checked={filters.language.includes('Telugu')}
            onChange={() => handleCheckboxChange('language', 'Telugu')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="lang-telugu" className={styles.filterLabel}>Telugu</label>
        </div> 
        <div className={styles.showMore}>+10 More</div>
      </div>

      
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Facility</h3>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="facility-apollo"
            checked={filters.facility.includes('Apollo Hospital')}
            onChange={() => handleCheckboxChange('facility', 'Apollo Hospital')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="facility-apollo" className={styles.filterLabel}>Apollo Hospital</label>
        </div>
        <div className={styles.filterOption}>
          <input
            type="checkbox"
            id="facility-other"
            checked={filters.facility.includes('Other Clinics')}
            onChange={() => handleCheckboxChange('facility', 'Other Clinics')}
            className={styles.filterCheckbox}
          />
          <label htmlFor="facility-other" className={styles.filterLabel}>Other Clinics</label>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FilterSidebar)