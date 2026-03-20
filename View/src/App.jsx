import { useState } from "react";
import Home1 from "./UserPages/User/Home1";
import "./index.css";
import AppRoutes from "./Approutes/AppRoutes";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./ContextAPI/Authcontext";
import { CarProvider } from "./ContextAPI/Carcontext";
import { CartProvider } from "./ContextAPI/Cartcontext";
import ToastContext from "./ContextAPI/ToastContext";
import ErrorBoundary from "./ContextAPI/ErrorBoundary";

import ProductControlers from "./Admin/AdminControllers/ProductControlers";
import UserControlers from "./Admin/AdminControllers/UserControlers";
import { WishlistProvider } from "./ContextAPI/WishlistContext";
import OrderController from "./Admin/AdminControllers/OrderController";

function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthProvider>
            <CarProvider>
              <CartProvider>
                <ToastContext>
                  <WishlistProvider>
                    <ProductControlers>
                      <UserControlers>
                        <OrderController>
                          <AppRoutes/>
                        </OrderController>
                      </UserControlers>
                    </ProductControlers>
                  </WishlistProvider>
                </ToastContext>
              </CartProvider>
            </CarProvider>
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
