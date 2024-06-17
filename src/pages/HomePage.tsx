import React, { useContext, useEffect } from "react";
import { productsContext } from "../contexts/ProductsContext";
import { Box } from "@mui/material";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const context = useContext(productsContext);
  if (!context) {
    throw new Error("Ошибка с useContext HomePage");
  }
  const { getProducts, products } = context;

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginTop: "50px", gap: "20px", padding: "0 10px" }}>
        {products.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </Box>
    </Box>
  );
}
