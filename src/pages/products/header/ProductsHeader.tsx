
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { addProduct } from '../../../store/productsSlice';
import styles from './ProductsHeader.module.scss'

interface ProductsHeaderProps {
    onSortByDate: () => void;
    onSortByName: (name: string) => void;
}

export default function ProductsHeader({ onSortByDate, onSortByName }: ProductsHeaderProps) {

    const dispatch = useAppDispatch();

    const [sortBy, setSortBy] = useState('Name');
    const [searchTerm, setSearchTerm] = useState('');

    const onAddClick = () => {
        dispatch(addProduct());
    };

    useEffect(() => {
        
    }, [searchTerm])

    useEffect(() => {
        if(sortBy === 'Name') {
            onSortByName(searchTerm);
        } else if(sortBy === 'Date') {
            onSortByDate();
        }
    }, [sortBy, searchTerm])

    return (
        <header className={styles.header}>
            <div>
                <button className={styles.add_button} onClick={onAddClick}>+Add</button>
            </div>
            <div>
                <div className={styles.search_container}>
                    <i className={styles.search_icon + ' fas fa-search search-icon'} ></i>
                    <input className={styles.search_input} type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
            </div>
            <div className={styles.sorter_container}>
                <label htmlFor="sorter">Sort by</label>
                <select 
                    name="sorter" 
                    id="sorter" 
                    className={styles.sorter} 
                    onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                    <option value="Name">Name</option>
                    <option value="Date">Date</option>
                </select>
            </div>
        </header>
    );
}