import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { setSelectedProductId, useAppSelector, type Product } from "../../../store/productsSlice";
import ProductItem from "../item/ProductItem";

import styles from "./ProductsList.module.scss";

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );

  const handleItemClick = (productId: number) => {
    dispatch(setSelectedProductId(productId))
    navigate(`/products/${productId}`);
  };

  const productsRender = products.map((product) => (
    <ProductItem
      key={product.id}
      product={product}
      isSelected={selectedProduct?.id === product.id}
      onClick={() => handleItemClick(product.id)}
    />
  ));

  return <ul className={styles.container}>{productsRender}</ul>;
}
