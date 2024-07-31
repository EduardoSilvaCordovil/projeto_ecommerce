import { useState } from "react";
import Cart from "./components/Cart";
import Catalog from "./components/Catalog";
import "react-toastify/dist/ReactToastify.css";
import ThankYouPage from "./components/ThankYouPage";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        toast.info(`Quantidade do item ${product.name} atualizada.`);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`${product.name} adicionado com sucesso!`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const handleUpdateCart = (product, quantity) => {
    toast.info(`Quantidade do item ${product.name} atualizada.`);
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: +quantity } : item
      );
    });
  };

  const handleRemoveFromCart = (product) => {
    toast.error(`${product.name} foi removido com sucesso!`);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Catálogo</Link>
          <Link to="/cart">Carrinho</Link>
        </nav>

        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<Catalog onAddToCart={handleAddCart} />}
            ></Route>
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onUpdateCart={handleUpdateCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  setCartItems={setCartItems}
                  onCheckout={() => {
                    if (cartItems.length > 0) {
                      toast.success("Compra finalizada com sucesso!");
                      setCartItems([]);
                    } else {
                      toast.error("Seu carrinho está vazio");
                    }
                  }}
                />
              }
            ></Route>
            <Route path="/thank-you-page" element={<ThankYouPage />}></Route>
          </Routes>
        </div>

        <ToastContainer
          closeOnClick
          pauseOnHover
          autoClose={3000}
          pauseOnFocusLoss
          position="top-center"
          hideProgressBar={false}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
