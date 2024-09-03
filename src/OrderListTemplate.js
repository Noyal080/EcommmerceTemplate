import React from "react";
import {
  Container,
  Grid,
  Image,
  Header,
  Divider,
  Segment,
  Message,
} from "semantic-ui-react";

const OrderListTemplate = ({
  orderData,
  currency = "Rs.",
  handleProductClick,
}) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "orange";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "grey";
    }
  };
  const calculateTotalPrice = (order) => {
    return order?.products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };
  return (
    <div>
      {orderData?.length > 0 ? (
        orderData?.map((orders) => (
          <Segment as={Container} secondary>
            <Grid stackable doubling divided>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <Header sub>Order Number</Header>
                  <p> {orders?.id} </p>
                </Grid.Column>
                <Grid.Column>
                  <Header sub>Order Date</Header>
                  <p>{orders?.order_date} </p>
                </Grid.Column>
                {orders?.delivery_date && (
                  <Grid.Column>
                    <Header sub>Delivery Date</Header>
                    <p>{orders?.delivery_date}</p>
                  </Grid.Column>
                )}
                <Grid.Column>
                  <Header sub>Status</Header>
                  <p
                    style={{
                      fontWeight: "bold",
                      color: getStatusColor(orders.status),
                    }}
                  >
                    {orders?.status}{" "}
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Divider />
            {orders.products.map((product, index) => (
              <Grid stackable doubling>
                <Grid.Row
                  style={{ cursor: "pointer" }}
                  onClick={() => handleProductClick(product)}
                >
                  <Grid.Column width={3}>
                    <Image src={product?.image} />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <Header as="h4">{product.product_name}</Header>
                    <p style={{ color: "black" }}> {product?.description} </p>
                    <p>
                      {" "}
                      Quantity :{" "}
                      <b style={{ color: "black" }}>
                        {" "}
                        {product.quantity}{" "}
                      </b>{" "}
                    </p>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="right">
                    <Header as="h4">
                      {" "}
                      {currency}
                      {product.price.toFixed(2)}
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Divider />
              </Grid>
            ))}

            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Header as="h4">
                    Total Amount: {currency}{" "}
                    {calculateTotalPrice(orders).toFixed(2)}
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign="right"></Grid.Column>
              </Grid.Row>
              {/* Product Details Section */}
            </Grid>
          </Segment>
        ))
      ) : (
        <Grid.Column>
          <Message info>No Orders have been placed.</Message>
        </Grid.Column>
      )}
    </div>
  );
};

export default OrderListTemplate;
