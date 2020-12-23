import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PurchasePage from "../Components/PurchasePage/PurchasePage";
import AddToCartPage from "../Components/AddToCartPage/AddToCartPage";

export default function Routes() {
  return (
    <Router>
      <Route path="/" exact component={PurchasePage} />
      <Route path="/cart" exact component={AddToCartPage} />
    </Router>
  );
}
