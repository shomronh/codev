import styles from "./ProductItem.module.scss";

import lambo1 from "../../../assets/lambo1.jpg";
import { deleteProduct, type Product } from "../../../store/productsSlice";
import { useAppDispatch } from "../../../store/hooks";
import type { MouseEvent } from "react";

interface ProductItemProps {
  product: Product;
  isSelected?: boolean;
  onClick: () => void;
}

export default function ProductItem({
  product,
  isSelected,
  onClick,
}: ProductItemProps) {

  const dispatch = useAppDispatch();

  const handleOnClick = (e: MouseEvent) => {
    e.stopPropagation();

    const dataId = e.currentTarget.getAttribute('data-id')

    if (dataId === 'container') {
      return onClick();
    }
    else if (dataId === 'delete-button') {
      return dispatch(deleteProduct(product.id));
    }

    throw new Error(`Unknown data-id=${dataId}`)
  }

  return (
    <li className={styles.container} onClick={handleOnClick} data-id="container">
      <img className={styles.image} src={lambo1} alt="Lamborghini" />
      <div className={styles.detailsContainer}>
        <p className={styles.title}>{product.name}</p>
        <p className={styles.description}>{product.description}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleOnClick} data-id="delete-button">Delete</button>
      </div>
      <div
        className={`${styles.hoverContainer} ${isSelected ? styles.hoverContainer_selected : ""
          }`}
      ></div>
    </li>
  );
}
