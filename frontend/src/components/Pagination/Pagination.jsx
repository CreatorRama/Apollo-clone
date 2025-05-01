
'use client';

import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  
  
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  
  
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className={styles.pagination} >
      
      <button 
        className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={(e) => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      
      {startPage > 1 && (
        <>
          <button 
            className={styles.pageButton}
            onClick={(e) => onPageChange(1)}
          >
            1
          </button>
          
          {startPage > 2 && (
            <span className={styles.ellipsis}>...</span>
          )}
        </>
      )}
      
      
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      
     
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className={styles.ellipsis}>...</span>
          )}
          
          <button 
            className={styles.pageButton}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      
      
      <button 
        className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
        onClick={(e) => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default React.memo(Pagination)