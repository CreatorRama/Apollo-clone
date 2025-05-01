
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import DoctorCard from '@/components/DoctorCard/DoctorCard';
import FilterSidebar from '@/components/Filters/FilterSidebar';
import Pagination from '@/components/Pagination/Pagination';
import { fetchDoctors } from '@/services/doctorService';
import { useApi } from '@/hooks/useApi';
import styles from './DoctorListing.module.css';

const DoctorListing = ({ specialty = 'General Physician' }) => {
  const [doctors, setDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    consultMode: [],
    experience: [],
    fees: [],
    language: [],
    facility: [],
  });
  
  const { callApi, loading, error } = useApi();
  const itemsPerPage = 4;

  const totalPages = useMemo(() => (
    Math.ceil(totalDoctors / itemsPerPage)
  ), [totalDoctors])

  const loadDoctors = useCallback(async () => {
    try {
      const filterParams = {
        page: currentPage,
        limit: itemsPerPage,
        specialty,
        ...(filters.consultMode.length > 0 && { consultMode: filters.consultMode.join(',') }),
        ...(filters.experience.length > 0 && { experience: filters.experience.join(',') }),
        ...(filters.fees.length > 0 && { fees: filters.fees.join(',') }),
        ...(filters.language.length > 0 && { language: filters.language.join(',') }),
        ...(filters.facility.length > 0 && { facility: filters.facility.join(',') }),
      };
      
      const response = await callApi(fetchDoctors, filterParams);
      
      setDoctors(response.data.doctors);
      setTotalDoctors(response.data.pagination.total);
    } catch (err) {
      console.error('Error loading doctors:', err);
    }
  },[filters,currentPage])


  useEffect(() => {   
    loadDoctors();
  }, [specialty, currentPage, filters,loadDoctors]);

  
  
  const handleFilterChange = useCallback((filterCategory, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };     
     
      if (updatedFilters[filterCategory].includes(value)) {
        updatedFilters[filterCategory] = updatedFilters[filterCategory].filter(item => item !== value);
      } else {
        updatedFilters[filterCategory] = [...updatedFilters[filterCategory], value];
      }
      
      return updatedFilters;
    });
    
   
    setCurrentPage(1);
  },[filters])

  
  const handlePageChange =useCallback( (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[currentPage])

  
  const clearAllFilters = () => {
    setFilters({
      consultMode: [],
      experience: [],
      fees: [],
      language: [],
      facility: [],
    });
    setCurrentPage(1);
  };

  return (
    <div className={styles.doctorListingContainer}>
      <div className={styles.filterHeader}>
        <div className={styles.filterHeaderLeft}>
          <h2>Filters</h2>
          {(filters.consultMode.length > 0 || 
            filters.experience.length > 0 || 
            filters.fees.length > 0 || 
            filters.language.length > 0 || 
            filters.facility.length > 0) && (
            <button className={styles.clearAllBtn} onClick={clearAllFilters}>
              Clear All
            </button>
          )}
        </div>
        <div className={styles.filterHeaderRight}>
          <div className={styles.doctorCount}>
            ({totalDoctors} doctors)
          </div>
          <div className={styles.sortDropdown}>
            <select className={styles.sortSelect}>
              <option value="relevance">Relevance</option>
              <option value="fees_low">Fees: Low to High</option>
              <option value="fees_high">Fees: High to Low</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className={styles.contentContainer}>
       
        <aside className={styles.filtersContainer}>
          <FilterSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>
       
        <div className={styles.doctorsContainer}>
          {loading ? (
            <div className={styles.loading}>Loading doctors...</div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : doctors.length === 0 ? (
            <div className={styles.noDoctors}>
              No doctors found matching your criteria.
            </div>
          ) : (
            <>
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
              
              
              {totalPages>1 && (
                <Pagination 
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalDoctors / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorListing;