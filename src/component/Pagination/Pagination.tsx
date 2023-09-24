import React from 'react';
import { usePagination, DOTS } from './usePagination';
import styles from './Pagination.module.css';
import classNames from 'classnames';

interface PaginationProps {
  onPageChange: (arg0: number) => void,
  totalCount: number,
  siblingCount: number,
  currentPage: number,
  pageSize: number,
}

export const Pagination = ({onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize}: PaginationProps)=> {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classNames(styles.paginationContainer)}
    >
       {/* Left navigation arrow */}
      <li
        className={(currentPage === 1) ? classNames(styles.paginationItem, styles.disabled) : styles.paginationItem}
        onClick={onPrevious}
      >
        <div className={classNames(styles.arrow, styles.left)} />
      </li>
      {paginationRange.map((pageNumber, index) => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li key={index} className={`${styles.paginationItem} ${styles.dots}`}>&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li
            key={index}
            className={(pageNumber === currentPage) ? classNames(styles.paginationItem, styles.selected) : styles.paginationItem}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={(currentPage === lastPage) ? classNames(styles.paginationItem, styles.disabled) : styles.paginationItem}
        onClick={onNext}
      >
        <div className={classNames(styles.arrow, styles.right)} />
      </li>
    </ul>
  );
};