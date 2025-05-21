'use client';

import { useState } from 'react';
import { addDoctor } from '@/services/doctorService';
import styles from './AddDoctorForm.module.css';
import { useApi } from '@/hooks/useApi';

const AddDoctorForm = ({ onDoctorAdded }) => {
  const initialFormState = {
    name: '',
    title: '',
    specialty: 'General Physician',
    qualifications: '',
    experience: {
      years: 0,
      category: '0-5'
    },
    fees: {
      amount: 500,
      currency: 'INR',
      category: '100-500',
      cashback: {
        amount: 0,
        applicable: false
      }
    },
    location: {
      city: '',
      state: '',
      clinic: '',
      fullAddress: ''
    },
    ratings: {
      percentage: 90,
      totalPatients: 0
    },
    languages: ['English'],
    availability: {
      online: {
        available: true,
        waitTime: 5
      },
      hospital: {
        available: false
      }
    },
    facility: 'Apollo 24/7 Virtual Clinic',
    profileImage: '/default-doctor.png',
    featured: false,
    doctorOfTheHour: false
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [debugInfo, setDebugInfo] = useState(null);

  const { callApi } = useApi();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const parts = name.split('.');
      
      
      if (parts.length === 3) {
        const [parent, middle, child] = parts;
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [middle]: {
              ...prev[parent][middle],
              [child]: type === 'number' ? (value === '' ? 0 : Number(value)) : value
            }
          }
        }));
      } else if (parts.length === 2) {
        
        const [parent, child] = parts;
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === 'number' ? (value === '' ? 0 : Number(value)) : value
          }
        }));
      }
    } else {
     
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : 
                type === 'number' ? (value === '' ? 0 : Number(value)) : value
      }));
    }
  };

  const handleAvailabilityChange = (type, checked) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [type]: {
          ...prev.availability[type],
          available: checked,
          waitTime: type === 'online' ? (checked ? (prev.availability[type].waitTime || 5) : 5) : undefined
        }
      }
    }));
  };

  const handleCashbackChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      fees: {
        ...prev.fees,
        cashback: {
          ...prev.fees.cashback,
          applicable: checked
        }
      }
    }));
  };

  const handleLanguageChange = (language) => {
    setFormData(prev => {
      const currentLanguages = [...prev.languages];
      if (currentLanguages.includes(language)) {
        return {
          ...prev,
          languages: currentLanguages.filter(lang => lang !== language)
        };
      } else {
        return {
          ...prev,
          languages: [...currentLanguages, language]
        };
      }
    });
  };

  const formatQualifications = (qualificationsString) => {
    return qualificationsString
      .split(',')
      .map(qual => qual.trim())
      .filter(qual => qual !== '');
  };

  
  const setFeeCategory = (amount) => {
    const numAmount = Number(amount);
    let category = '100-500';
    if (numAmount > 1000) {
      category = '1000+';
    } else if (numAmount > 500) {
      category = '500-1000';
    }
    
    setFormData(prev => ({
      ...prev,
      fees: {
        ...prev.fees,
        amount: numAmount,
        category
      }
    }));
  };

  
  const setExperienceCategory = (years) => {
    const numYears = Number(years);
    let category = '0-5';
    if (numYears >= 17) {
      category = '17+';
    } else if (numYears >= 11) {
      category = '11-16';
    } else if (numYears >= 6) {
      category = '6-10';
    }
    
    setFormData(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        years: numYears,
        category
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    setFormSuccess('');
    setDebugInfo(null);
    
    try {
      if (!formData.name.trim()) {
        throw new Error('Doctor name is required');
      }
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.qualifications.trim()) {
        throw new Error('Qualifications are required');
      }
      
      const formattedData = {
        ...formData,
        qualifications: formatQualifications(formData.qualifications),
        availability: {
          online: {
            available: formData.availability.online.available,
            waitTime: formData.availability.online.waitTime || 5
          },
          hospital: {
            available: formData.availability.hospital.available
          }
        }
      }
      
      console.log('Submitting doctor data:', formattedData);
      
      const response = await callApi(addDoctor, formattedData);
      
      setFormSuccess('Doctor added successfully!');
      setFormData(initialFormState);
      setTimeout(() => {
        setFormSuccess('')
      }, 5000);
      
      if (onDoctorAdded) {
        onDoctorAdded(response.data);
      }
    } catch (error) {
      setFormError(error.message);
      console.error('Form submission error:', error);
      setTimeout(() => {
        setFormError('')
      }, 5000);
      
      try {
        const errorDetails = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apollo-clone-ra2r.onrender.com/api'}/doctors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            qualifications: formatQualifications(formData.qualifications),
            availability: {
              online: {
                available: formData.availability.online.available,
                waitTime: formData.availability.online.waitTime || 5
              },
              hospital: {
                available: formData.availability.hospital.available
              }
            }
          }),
        });
        
        if (!errorDetails.ok) {
          const errorBody = await errorDetails.json();
          setDebugInfo({
            status: errorDetails.status,
            statusText: errorDetails.statusText,
            error: errorBody
          });
        }
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add New Doctor</h2>
      
      {formError && <div className={styles.errorMessage}>{formError}</div>}
      {formSuccess && <div className={styles.successMessage}>{formSuccess}</div>}
      
    
      {debugInfo && (
        <div className={styles.debugSection}>
          <h4>Debug Information:</h4>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h3>Basic Information</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={styles.formControl}
            />
          </div>
          
          <div className={styles.formGroup}>
          <label htmlFor="title">Title *</label>
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className={styles.formControl}
            >
              <option value="">Select Title</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
              <option value="Dr. Prof.">Dr. Prof.</option>
              <option value="Assoc. Prof.">Assoc. Prof.</option>
              <option value="Asst. Prof.">Asst. Prof.</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="specialty">Specialty *</label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleInputChange}
              required
              className={styles.formControl}
            >
              <option value="General Physician">General Physician</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Neurologist">Neurologist</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="qualifications">Qualifications *</label>
            <input
              type="text"
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleInputChange}
              placeholder="MBBS, MD, MS (comma-separated)"
              required
              className={styles.formControl}
            />
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Experience & Fees</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="experience.years">Years of Experience *</label>
            <input
              type="number"
              id="experience.years"
              name="experience.years"
              value={formData.experience.years}
              onChange={(e) => setExperienceCategory(e.target.value)}
              min="0"
              required
              className={styles.formControl}
            />
           <span className={styles.helperText}>Experience Category: {formData.experience.category}</span>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="fees.amount">Consultation Fee (INR) *</label>
            <input
              type="number"
              id="fees.amount"
              name="fees.amount"
              value={formData.fees.amount}
              onChange={(e) => setFeeCategory(e.target.value)}
              min="100"
              required
              className={styles.formControl}
            />
           <span className={styles.helperText}>Fee Category: {formData.fees.category}</span>
          </div>
          
          <div className={styles.formGroup}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="cashback"
                checked={formData.fees.cashback.applicable}
                onChange={(e) => handleCashbackChange(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="cashback">Cashback Applicable</label>
            </div>
            
            {formData.fees.cashback.applicable && (
              <div className={styles.nestedField}>
                <label htmlFor="cashbackAmount">Cashback Amount</label>
                <input
                  type="number"
                  id="cashbackAmount"
                  name="fees.cashback.amount"
                  value={formData.fees.cashback.amount}
                  onChange={handleInputChange}
                  min="0"
                  className={styles.formControl}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Location & Contact</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="location.city">City</label>
            <input
              type="text"
              id="location.city"
              name="location.city"
              value={formData.location.city}
              onChange={handleInputChange}
              className={styles.formControl}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="location.state">State</label>
            <input
              type="text"
              id="location.state"
              name="location.state"
              value={formData.location.state}
              onChange={handleInputChange}
              className={styles.formControl}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="location.clinic">Clinic/Hospital Name</label>
            <input
              type="text"
              id="location.clinic"
              name="location.clinic"
              value={formData.location.clinic}
              onChange={handleInputChange}
              className={styles.formControl}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="location.fullAddress">Full Address</label>
            <textarea
              id="location.fullAddress"
              name="location.fullAddress"
              value={formData.location.fullAddress}
              onChange={handleInputChange}
              rows="3"
              className={styles.formControl}
            />
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Additional Information</h3>
          
          <div className={styles.formGroup}>
            <label>Languages</label>
            <div className={styles.checkboxContainer}>
              {['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi'].map(language => (
                <div key={language} className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id={`lang-${language}`}
                    checked={formData.languages.includes(language)}
                    onChange={() => handleLanguageChange(language)}
                    className={styles.checkbox}
                  />
                  <label htmlFor={`lang-${language}`}>{language}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Availability</label>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="availOnline"
                checked={formData.availability.online.available}
                onChange={(e) => handleAvailabilityChange('online', e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="availOnline">Available for Online Consultation</label>
            </div>
            
            {formData.availability.online.available && (
              <div className={styles.nestedField}>
                <label htmlFor="waitTime">Average Wait Time (minutes)</label>
                <input
                  type="number"
                  id="waitTime"
                  name="availability.online.waitTime"
                  value={formData.availability.online.waitTime}
                  onChange={handleInputChange}
                  min="0"
                  className={styles.formControl}
                />
              </div>
            )}
            
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="availHospital"
                checked={formData.availability.hospital.available}
                onChange={(e) => handleAvailabilityChange('hospital', e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="availHospital">Available for Hospital Visit</label>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="facility">Facility</label>
            <select
              id="facility"
              name="facility"
              value={formData.facility}
              onChange={handleInputChange}
              className={styles.formControl}
            >
              <option value="Apollo Hospital">Apollo Hospital</option>
              <option value="Apollo 24/7 Virtual Clinic">Apollo 24/7 Virtual Clinic</option>
              <option value="Other Clinics">Other Clinics</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              <label htmlFor="featured">Featured Doctor</label>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="doctorOfTheHour"
                name="doctorOfTheHour"
                checked={formData.doctorOfTheHour}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              <label htmlFor="doctorOfTheHour">Doctor of the Hour</label>
            </div>
          </div>
        </div>
        
        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Doctor...' : 'Add Doctor'}
          </button>
          
          <button 
            type="button" 
            className={styles.resetButton}
            onClick={() => setFormData(initialFormState)}
            disabled={isSubmitting}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorForm;