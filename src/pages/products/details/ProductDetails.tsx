import styles from "./ProductDetails.module.scss";

import lambo1 from "../../../assets/lambo1.jpg";
import {
  saveProduct,
  type Product,
  type ProductData,
} from "../../../store/productsSlice";
import { useAppDispatch } from "../../../store/hooks";
import { useEffect, useRef, useState } from "react";

interface ProductDetailsProps {
  product?: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price ?? 0.1);

  const [error_name_message, setErrorNameMessage] = useState("");
  const [error_description_message, setErrorDescriptionMessage] = useState("");
  const [error_price_message, setErrorPriceMessage] = useState("");

  function handleOnSave(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!formRef.current) {
      return;
    }

    let totalErrors = 0;

    if (!name) {
      setErrorNameMessage("Name is required");
      totalErrors++;
    } else {
      setErrorNameMessage("");
    }

    if (!description) {
      setErrorDescriptionMessage("Description is required");
      totalErrors++;
    } else {
      setErrorDescriptionMessage("");
    }

    if (price === undefined) {
      setErrorPriceMessage("Price is required");
      totalErrors++;
    } else {
      setErrorPriceMessage("");
    }

    if (totalErrors) {
      return;
    }

    const productData: ProductData = {
      name: name!,
      description: description!,
      price: price!,
    };

    if (product) {
      productData.id = product.id;
    }

    dispatch(saveProduct(productData));
  }

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description ?? "");
      setPrice(product.price);
    }
  }, [product]);

  return (
    <div className={styles.container}>
      <form className={styles.form} ref={formRef}>
        <p>Product {product?.id} Details</p>
        <p>
          <img className={styles.image} src={lambo1} alt="Lamborghini" />
        </p>
        <p>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            maxLength={30}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error_name_message && (
            <span className={styles.error_message}>{error_name_message}</span>
          )}
        </p>
        <p>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            maxLength={200}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error_description_message && (
            <span className={styles.error_message}>
              {error_description_message}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="price">Price:</label>
          <span>
            <input
              type="number"
              id="price"
              name="price"
              min={0.1}
              step={0.1}
              className={styles.price_input}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </span>
          {error_price_message && (
            <span className={styles.error_message}>{error_price_message}</span>
          )}
        </p>

        <p>
          <button
            type="submit"
            className={styles.save_button}
            onClick={handleOnSave}
          >
            Save
          </button>
        </p>
      </form>
    </div>
  );
}
