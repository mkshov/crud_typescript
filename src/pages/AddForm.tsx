import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { productsContext } from "../contexts/ProductsContext";
import { useNavigate } from "react-router-dom";

interface State {
  url: string;
  title: string;
  info: string;
  price: string;
}

export default function AddForm() {
  const context = useContext(productsContext);

  if (!context) {
    throw new Error("ProductForm must be used within a ProductsContextProvider");
  }

  const { createProduct } = context;

  const [inputs, setInputs] = useState<State>({
    url: "",
    title: "",
    info: "",
    price: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, inputName: string) {
    setInputs((prev) => ({
      ...prev,
      [inputName]: e.target.value,
    }));
  }

  const navigate = useNavigate();

  function handleClick(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    createProduct({ ...inputs, price: parseFloat(inputs.price) });
    navigate("/");
  }

  return (
    <Box>
      <Box onSubmit={handleClick} component={"form"}>
        <Typography variant="h4">Форма добавления</Typography>
        <TextField required onChange={(e) => handleChange(e, "url")} value={inputs.url} placeholder="Для ссылки изображения..." />
        <TextField required onChange={(e) => handleChange(e, "title")} value={inputs.title} placeholder="Для названия..." />
        <TextField required onChange={(e) => handleChange(e, "info")} value={inputs.info} placeholder="Для подробной информации..." />
        <TextField required onChange={(e) => handleChange(e, "price")} type="number" value={inputs.price} placeholder="Для цены..." />
        <Button type="submit" variant="contained">
          Добавить продукт
        </Button>
      </Box>
    </Box>
  );
}
