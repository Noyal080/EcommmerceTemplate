import React from "react";
import { Button, Icon, Image } from "semantic-ui-react";
import "./cart.css";

const CartDetailsTemplate = ({
  cartItems,
  setCartItems,
  currency = "Rs.",
  handleRemove = () => alert("Remove cart item function not provided"),
  handleImageClick = () => alert("Product Image route function not provided"),
  updateCartItems = () => alert("updateCartItems function not provided"),
  handleCheckout = () => alert("Checkout function not added"),
  onPressBrowse = () => alert("Handle Route to Browsing the products"),
}) => {
  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <>
      <div className="cart-page">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>No items added to the cart</h2>
            <Button
              color="yellow"
              onClick={() => onPressBrowse()}
              style={{ color: "black", marginLeft: "20%" }}
            >
              {" "}
              Browse Products{" "}
            </Button>
          </div>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((product) => (
              <div className="cart-item" key={product.id}>
                <Image
                  src={product.image}
                  onClick={() => handleImageClick(product)}
                  size="small"
                />
                <div className="cart-item-details">
                  <h4>{product.name}</h4>
                  <div className="quantity-price-row">
                    <div className="quantity-controls">
                      <Icon
                        name="minus"
                        onClick={() => handleQuantityChange(product.id, -1)}
                      />
                      <span>{product.quantity}</span>
                      <Icon
                        name="plus"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      />
                    </div>
                    <div className="cart-item-price">
                      {currency} {(product.price * product.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
                <Icon
                  name="close"
                  className="cart-item-delete"
                  onClick={() => handleRemove(product)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="checkout-section">
        <div className="subtotal">
          <h3>Subtotal ({cartItems.length} items)</h3>
          <h3>
            {currency} {subtotal.toFixed(2)}
          </h3>
        </div>
        <Button
          primary
          fluid
          onClick={() => handleCheckout(cartItems)}
          disabled={cartItems?.length > 0 ? false : true}
        >
          Checkout
        </Button>
      </div>
    </>
  );
};

export default CartDetailsTemplate;
