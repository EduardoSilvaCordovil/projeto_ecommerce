import Product from "./Product";
import { useState, useEffect } from "react";
import productsData from "../data/products_mock.json";

const Catalog = ({ onAddToCart }) => {
  return (
    <div>
      <h1>Catálogo de Produtos</h1>
      <div className="product-container">
        {productsData.map((product) => (
          <Product
            key={product.Id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
