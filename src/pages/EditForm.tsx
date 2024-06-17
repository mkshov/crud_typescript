import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../contexts/ProductsContext";
import { useNavigate, useParams } from "react-router-dom";

interface State {
  url: string;
  title: string;
  info: string;
  price: string;
}

export default function EditForm() {
  const context = useContext(productsContext);

  if (!context) {
    throw new Error("ProductForm must be used within a ProductsContextProvider");
  }

  const { editProduct, oneProduct, getOneProduct } = context;

  const { id } = useParams();

  const [inputs, setInputs] = useState<State>({
    url: "",
    title: "",
    info: "",
    price: "",
  });

  useEffect(() => {
    getOneProduct(id);
  }, []);

  useEffect(() => {
    if (oneProduct) {
      setInputs({
        url: oneProduct.url,
        title: oneProduct.title,
        info: oneProduct.info,
        price: oneProduct.price.toString(),
      });
    }
  }, [oneProduct]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, inputName: string) {
    setInputs((prev) => ({
      ...prev,
      [inputName]: e.target.value,
    }));
  }

  const navigate = useNavigate();

  function handleClick(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    editProduct(id, { ...inputs, price: parseFloat(inputs.price) });
    navigate(`/details/${id}`);
  }

  return (
    <Box>
      <Box onSubmit={handleClick} component={"form"}>
        <Typography variant="h4">Форма редактирования</Typography>
        <TextField required onChange={(e) => handleChange(e, "url")} value={inputs.url} placeholder="Для ссылки изображения..." />
        <TextField required onChange={(e) => handleChange(e, "title")} value={inputs.title} placeholder="Для названия..." />
        <TextField required onChange={(e) => handleChange(e, "info")} value={inputs.info} placeholder="Для подробной информации..." />
        <TextField required onChange={(e) => handleChange(e, "price")} type="number" value={inputs.price} placeholder="Для цены..." />
        <Button type="submit" variant="contained">
          Редактировать продукт
        </Button>
      </Box>
    </Box>
  );
}
