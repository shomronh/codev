
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import styles from './ProductsPagination.module.scss'
// import { useAppSelector } from '../../../store/productsSlice';

export interface ProductsPaginationHandle {
    triggerOnPageIndexChanged: () => void;
}

interface ProductsPaginationProps {
    totalPaginatedItems: number;
    onPageIndexChanged: (skipToIndex: number, pageSize: number) => void;
}

export default forwardRef<ProductsPaginationHandle, ProductsPaginationProps>(function ({ totalPaginatedItems, onPageIndexChanged }, ref) {

    const totalItemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);

    useImperativeHandle(ref, () => {
        return {
            triggerOnPageIndexChanged() {
                onPageIndexChanged((currentPageIndex - 1) * totalItemsPerPage, totalItemsPerPage);
            },
        };
    });

    const onPrevClick = () => {
        setCurrentPageIndex(prevPageIndex => {
            if (prevPageIndex > 1) {
                return prevPageIndex - 1;
            }
            return totalPages === 0 ? 0 : 1;
        });
    };

    const onNextClick = () => {
        setCurrentPageIndex(prevPageIndex => {
            if (prevPageIndex < totalPages) {
                return prevPageIndex + 1;
            }
            return totalPages === 0 ? 0 : totalPages;
        });
    };

    useEffect(() => {
        setTotalPages(prevTotalPages => {
            let newTotalPages = Math.ceil(totalPaginatedItems / totalItemsPerPage)
            if(prevTotalPages > newTotalPages) {
                // in case of deleting we might decrease number of pages
                setCurrentPageIndex(newTotalPages);
            }
            if(currentPageIndex === 0) {
                setCurrentPageIndex(1);
            }
            return newTotalPages;
        });
    }, [totalPaginatedItems])

    useEffect(() => {
        onPageIndexChanged((currentPageIndex - 1) * totalItemsPerPage, totalItemsPerPage);
    }, [currentPageIndex])

    useEffect(() => {
        onPageIndexChanged(0, totalItemsPerPage);
    }, [])

    const getRender = () => {
        return totalPaginatedItems >= 0 ? (
            <div className={styles.container}>
                <p className={styles.prev + (currentPageIndex === 0 || currentPageIndex === 1 ? ' ' + styles.disabled : '')} onClick={onPrevClick}>Prev Page</p>
                <p className={styles.current}>{currentPageIndex} of {totalPages}</p>
                <p className={styles.next + (currentPageIndex === totalPages ? ' ' + styles.disabled : '')} onClick={onNextClick}>Next Page</p>
            </div>
        ) : null;
    }

    return (
        <>
            {getRender()}
        </>
    );
});