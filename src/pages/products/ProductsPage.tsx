import { useEffect, useRef, useState } from "react";
import { setSelectedProductId, useAppSelector, type Product } from "../../store/productsSlice";
import ProductDetails from "./details/ProductDetails";
import ProductsHeader from "./header/ProductsHeader";
import ProductsList from "./list/ProductsList";
import ProductsPagination, { type ProductsPaginationHandle } from "./pagination/ProductsPagination";

import styles from "./ProductsPage.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";

export default function ProductsPage() {

  const { productId = '' } = useParams();

  const dispatch = useAppDispatch();
  const action = useAppSelector(state => state.products.action);
  const selectedProduct = useAppSelector(state => state.products.selectedProduct);
  const products = useAppSelector((state) => state.products.products);
 
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);

  const paginationHandlerRef = useRef<ProductsPaginationHandle>(null);

  function handleSortByDate() {
    const items = [...products];
    const sorted = items.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
    setFilteredProducts(sorted);
  }

  function handleSortByName(name: string) {
    if (!name) {
      setFilteredProducts(products);
      return;
    }
    const items = [...products];
    const filtered: Product[] = items.filter(product => {
      return (
        product.name.toLowerCase().includes(name.toLowerCase()) ||
        product.description?.toLowerCase().includes(name.toLowerCase())
      );
    });
    setFilteredProducts(filtered);
  }

  function handlePageIndexChanged(skipToIndex: number, pageSize: number){
    const items = [...filteredProducts];
    const paginatedItems = items.slice(skipToIndex, skipToIndex + pageSize);
    setPaginatedProducts(paginatedItems);
  }
  
  useEffect(() => {
    paginationHandlerRef.current?.triggerOnPageIndexChanged();
  }, [filteredProducts])

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (!productId) return;
    dispatch(setSelectedProductId(Number(productId)));
  }, [productId])

  return (
    <>
      <div className={styles.container}>

        <main className={styles.main}>
          <div className={styles.productsListContainer}>
            <ProductsHeader onSortByDate={handleSortByDate} onSortByName={handleSortByName} />
            <ProductsList products={paginatedProducts} />
            <div className={styles.paginationContainer}>
              <ProductsPagination 
                ref={paginationHandlerRef}
                totalPaginatedItems={filteredProducts.length} 
                onPageIndexChanged={handlePageIndexChanged} />
            </div>
          </div>
        </main>

        <aside className={styles.aside}>
          {action === 'add_product' && <ProductDetails />}
          {action === 'edit_product' && <ProductDetails product={selectedProduct} />}
        </aside>
      </div>
    </>
  );
}
