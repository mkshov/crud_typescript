import axios from "axios";
import React, { ReactNode, createContext, useReducer } from "react";

// ! Типизация для продукта
export interface Product {
  id?: number;
  title: string;
  info: string;
  url: string;
  price: number;
}

// ! Типизация для начального состояния
interface InitialState {
  products: Product[];
  oneProduct: Product | null;
}

// ! Типизация для действий редьюсера
type Action = { type: "GET_PRODUCTS"; payload: Product[] } | { type: "GET_ONE_PRODUCT"; payload: Product };

// ! Типизация для контекста
interface ProductsContextType {
  products: Product[];
  oneProduct: Product | null;
  getProducts: () => void;
  createProduct: (products: Product) => void;
  getOneProduct: (id: string | undefined) => void;
  deleteProduct: (id: string | undefined) => void;
  editProduct: (id: string | undefined, product: Product) => void;
}

interface ProviderProps {
  children: ReactNode;
}

// ! Создаем контекст
export const productsContext = createContext<ProductsContextType | undefined>(undefined);

const INIT_STATE: InitialState = {
  products: [],
  oneProduct: null,
};

function reducer(state: InitialState, action: Action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };
  }
}

const API = "http://localhost:8000/products";

export default function ProductsContextProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function createProduct(product: Product) {
    await axios.post(API, product);
  }

  async function getProducts() {
    let res = await axios(API);
    dispatch({
      type: "GET_PRODUCTS",
      payload: res.data,
    });
  }

  async function getOneProduct(id: string | undefined) {
    let res = await axios(`${API}/${id}`);
    dispatch({
      type: "GET_ONE_PRODUCT",
      payload: res.data,
    });
  }

  async function deleteProduct(id: string | undefined) {
    await axios.delete(`${API}/${id}`);
    getProducts();
  }

  async function editProduct(id: string | undefined, product: Product) {
    await axios.patch(`${API}/${id}`, product);
    getProducts();
  }

  return (
    <productsContext.Provider
      value={{ products: state.products, oneProduct: state.oneProduct, getProducts, createProduct, getOneProduct, deleteProduct, editProduct }}
    >
      {children}
    </productsContext.Provider>
  );
}
