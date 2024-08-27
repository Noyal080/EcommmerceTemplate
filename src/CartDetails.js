import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Message,
} from "semantic-ui-react";
const CartDetails = ({
  getCartItems,
  updateCartItems = () => alert("updateCartItems function not provided"),
  removeCartItems = () => alert("removeCartItems function not provided"),
  currency = "Rs.",
  handleImageClick = () => alert("handleImageClick function not provided"),
  handleCheckout = () => alert("handleCheckout function not provided"),
}) => {
  const [cartItems, setCartItems] = useState(
    typeof getCartItems === "function" ? getCartItems() : []
  );

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
                    onClick={() => removeCartItems(cart)}
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
