'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import AddDoctorForm from '@/components/AddDoctorForm/AddDoctorForm';
import { fetchDoctors } from '@/services/doctorService';
import { useApi } from '@/hooks/useApi';
import styles from './AdminDashboard.module.css';

const ITEMS_PER_PAGE = 10;

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('add-doctor');
  
  const { callApi, loading, error } = useApi();

  const loadDoctors = useCallback(async () => {
    try {
      const response = await callApi(fetchDoctors, { 
        page: currentPage,
        limit: ITEMS_PER_PAGE
      });
      
      setDoctors(response.data.doctors);
      setTotalDoctors(response.data.pagination.total);
    } catch (err) {
      console.error('Error loading doctors:', err);
    }
  }, [callApi, currentPage]);

  const handleDoctorAdded = useCallback(() => {
    loadDoctors();
    setActiveTab('manage-doctors');
  }, [loadDoctors]);

  useEffect(() => {
    if (activeTab === 'manage-doctors') {
      loadDoctors();
    }
  }, [currentPage, activeTab, loadDoctors]);

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 'add-doctor':
        return <AddDoctorForm onDoctorAdded={handleDoctorAdded} />;
      
      case 'manage-doctors':
        if (loading) {
          return <div className={styles.loading}>Loading doctors...</div>;
        }
        
        if (error) {
          return <div className={styles.error}>{error}</div>;
        }
        
        if (doctors.length === 0) {
          return <div className={styles.noDoctors}>No doctors found in the database.</div>;
        }
        
        return (
          <div className={styles.doctorsTable}>
            <h2>All Doctors</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialty</th>
                  <th>Experience</th>
                  <th>Fees</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{doctor.title} {doctor.name}</td>
                    <td>{doctor.specialty}</td>
                    <td>{doctor.experience.years} years</td>
                    <td>₹{doctor.fees.amount}</td>
                    <td>{doctor.location.city || 'Online'}</td>
                    <td>
                      <span className={`${styles.status} ${doctor.featured ? styles.featured : ''}`}>
                        {doctor.featured ? 'Featured' : 'Regular'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return null;
    }
  }, [activeTab, loading, error, doctors, handleDoctorAdded]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'add-doctor' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('add-doctor')}
        >
          Add New Doctor
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'manage-doctors' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('manage-doctors')}
        >
          Manage Doctors ({totalDoctors})
        </button>
      </div>
      
      <div className={styles.tabContent}>
        {tabContent}
      </div>
    </div>
  );
};

export default AdminDashboard;