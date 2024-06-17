import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productsContext } from "../contexts/ProductsContext";
import { Box, Button } from "@mui/material";

export default function Details() {
  const navigate = useNavigate();

  const context = useContext(productsContext);

  if (!context) {
    throw new Error("Ошибка из useContext Details");
  }

  const { getOneProduct, deleteProduct, oneProduct } = context;

  const { id } = useParams();

  useEffect(() => {
    console.log("changed");
    getOneProduct(id);
  }, []);

  if (!oneProduct) {
    return <h1>Загрузка...</h1>;
  }
  // hello

  function handleDelete() {
    deleteProduct(id);
    navigate("/");
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <img style={{ width: "100%", height: "50vh", objectFit: "contain" }} src={oneProduct.url} alt={oneProduct.title} />
      <h2>{oneProduct.title}</h2>
      <p>{oneProduct.info}</p>
      <p>{oneProduct.price}</p>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button onClick={handleDelete} variant="contained">
          Удалить продукт
        </Button>
        <Button onClick={() => navigate(`/edit-form/${id}`)} variant="contained">
          Редактировать продукт
        </Button>
      </Box>
    </Box>
  );
}
