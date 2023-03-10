import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { formatPrice } from "../util/format";
import { MdAddShoppingCart } from "react-icons/md";
import { useServiceContext } from "shell/Service";

import { ProductList } from "./styles";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

export const Home = (): JSX.Element => {
  const { addProduct, cart } = useServiceContext();
  const [products, setProducts] = useState<ProductFormatted[]>([]);

  // quantidade de itens no carrinho
  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount);


  function handleAddProduct(id: number) {
    addProduct(id);
  }

  useEffect(() => {
    // array de produtos da api
    async function loadProducts() {
      const response = await api.get<Product[]>("products");

      const data = response.data.map((product) => ({
        ...product,
        // passando valor formatado
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};
