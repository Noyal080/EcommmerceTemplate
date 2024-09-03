import React from "react";
import {
  Card,
  Grid,
  Header,
  Label,
  Message,
  Pagination,
  Segment,
} from "semantic-ui-react";

const OrderList = ({
  orderData = [],
  currentPage = 1,
  handlePaginationChange = () =>
    alert("Handle page change function not available"),
  totalPages = 1,
  handleProductClick = () => alert("Handle Product View Route not available"),
  currency = "Rs.",
}) => {
  const calculateTotalPrice = (order) => {
    return order?.products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };

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

  return (
    <>
      <Grid columns={4} stackable doubling stretched>
        {orderData?.length > 0 ? (
          orderData?.map((order) => (
            <Grid.Column key={order.id}>
              <Segment basic raised>
                <Card fluid>
                  <Card.Content>
                    <Header as="h3" style={{ color: "#2185d0" }}>
                      Order #{order.id}
                    </Header>
                    {order.products.map((product, index) => (
                      <Card key={index} style={{ marginBottom: "10px" }}>
                        <Grid>
                          <Grid.Column width={5}>
                            <div
                              onClick={() => handleProductClick(product)}
                              style={{
                                backgroundImage: `url("${product?.image}")`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                height: "100px",
                                width: "100px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                cursor: "pointer",
                                borderRadius: "8px",
                              }}
                            />
                          </Grid.Column>
                          <Grid.Column
                            width={11}
                            verticalAlign="middle"
                            style={{
                              paddingLeft: "20px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Card.Description>
                              <Header as="h4" style={{ marginBottom: "5px" }}>
                                {product.product_name}
                              </Header>
                              <p style={{ fontSize: "1rem", color: "#666" }}>
                                {product.quantity} pcs - {currency}
                                {product.price.toFixed(2)}
                              </p>
                            </Card.Description>
                          </Grid.Column>
                        </Grid>
                      </Card>
                    ))}
                    <div
                      style={{
                        borderTop: "1px solid gray",
                        padding: 5,
                        margin: 5,
                      }}
                    >
                      <p>
                        Order Date:{" "}
                        {new Date(order.order_date).toLocaleDateString()}
                      </p>
                      {order.recieved_date && (
                        <p>
                          Received Date:{" "}
                          {new Date(order.recieved_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </Card.Content>
                  <Card.Content extra>
                    <Grid columns="equal">
                      <Grid.Row>
                        <Grid.Column>
                          <Header as="h4">
                            Total Price: {currency}{" "}
                            {calculateTotalPrice(order).toFixed(2)}
                          </Header>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                          <Label
                            basic
                            circular
                            style={{
                              fontWeight: "bold",
                              backgroundColor: getStatusColor(order.status),
                              color: "white",
                            }}
                          >
                            {order.status}
                          </Label>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
          ))
        ) : (
          <Grid.Column>
            <Message info>No Orders have been placed.</Message>
          </Grid.Column>
        )}
      </Grid>
      {totalPages > 1 && (
        <Grid centered>
          <Pagination
            pointing
            secondary
            activePage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePaginationChange}
          />
        </Grid>
      )}
    </>
  );
};

export default OrderList;
