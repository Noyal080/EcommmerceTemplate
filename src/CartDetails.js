import React, { useState } from "react";
import { Button, Container, Grid, Header, Image } from "semantic-ui-react";
const CartDetails = ({
  getCartItems,
  updateCartItems,
  currency,
  handleImageClick,
  handleCheckout,
}) => {
  const [cartItems, setCartItems] = useState(getCartItems());
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product !== productId
    );
    updateCartItems(updatedCartItems, setCartItems, navigate);
    toast.info("Item has been deleted");
  };
  return (
    <Container>
      <Header as="h2">My Cart</Header>
      {cartItems.length > 0 ? (
        <>
          <Grid celled columns={"equal"} stackable textAlign="center" doubling>
            {cartItems.map((cart) => (
              <Grid.Row>
                <Grid.Column>
                  <Image
                    src={cart.image}
                    onClick={() => handleImageClick()}
                    size="medium"
                  />
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                  {" "}
                  <p> {cart?.name} </p>
                  <p>
                    {" "}
                    <b> Price : </b> {currency}
                    {cart.price}
                  </p>
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                  <p>Quantity: {cart.quantity}</p>
                  <p>
                    Total: {currency}
                    {cart.price * cart.quantity}
                  </p>
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                  <Button
                    icon
                    labelPosition="right"
                    color="black"
                    basic
                    onClick={() => removeFromCart(cart.product)}
                  >
                    <Icon name="trash" />
                    Remove Item
                  </Button>
                </Grid.Column>
              </Grid.Row>
            ))}

            <Grid.Row>
              <Grid.Column>
                <h2>Total Price</h2>
              </Grid.Column>
              <Grid.Column>
                <h2>
                  {currency}
                  {cartItems
                    .map((c) => c.price * c.quantity)
                    .reduce((a, b) => parseInt(a) + parseInt(b), 0)}
                </h2>
              </Grid.Column>
              <Grid.Column>
                <Button
                  icon
                  labelPosition="right"
                  primary
                  onClick={() => handleCheckout()}
                >
                  <Icon name="right arrow" />
                  Checkout
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      ) : (
        <Message info>No Items in cart</Message>
      )}
    </Container>
  );
};

export default CartDetails;
