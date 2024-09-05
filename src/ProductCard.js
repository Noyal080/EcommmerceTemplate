import React from "react";
import {
  Button,
  Card,
  Grid,
  Icon,
  Image,
  Label,
  Popup,
  Pagination,
  Container,
} from "semantic-ui-react";

const ProductCard = ({
  productData,
  addToCart = () => alert("Add to cart function not added"),
  showWishlist = false,
  wishlist,
  addToWishList = () => alert("Add to wishlist funtion not added"),
  shareButtonExists,
  shareButton = false,
  currency = "Rs .",
  handleRoute = () => alert("Route for product not added"),
  itemsPerRow = 4,
  count = 0,
  fetchMore = () => alert("Fetch More function not added"),
}) => {
  return (
    <>
      <Grid stackable stretched doubling columns={itemsPerRow}>
        {productData?.length > 0 ? (
          productData?.map((product) => (
            <Grid.Column>
              <Grid.Row style={{ position: "relative" }}>
                <Image
                  src={product?.image}
                  centered
                  onClick={() => handleRoute(product.id)}
                  style={{ cursor: "pointer" }}
                />
                {product?.stock_quantity === 0 && (
                  <Label
                    color="red"
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      zIndex: 1,
                    }}
                  >
                    Out of Stock
                  </Label>
                )}
                {shareButtonExists && (
                  <>
                    <Popup
                      on={"click"}
                      trigger={
                        <Button
                          icon
                          style={{
                            position: "absolute",
                            zIndex: 1000,
                            top: "0px",
                            right: "0px",
                            cursor: "pointer",
                            border: "none",
                            backgroundColor: "rgba(0,0,0,0)",
                            color: "white",
                          }}
                        >
                          <Icon
                            name="share alternate"
                            style={{
                              filter:
                                "drop-shadow(0px 0px 1px rgba(0, 0, 0, 1))",
                            }}
                          />
                        </Button>
                      }
                      content={shareButton}
                    />
                    {showWishlist && (
                      <Button
                        icon
                        style={{
                          position: "absolute",
                          zIndex: 1000,
                          top: "30px",
                          right: "0px",
                          cursor: "pointer",
                          border: "none",
                          backgroundColor: "rgba(0,0,0,0)",
                          color: wishlist.includes(product.id)
                            ? "red"
                            : "white",
                        }}
                        onClick={() => addToWishList(product)}
                      >
                        <Icon name="heart" />
                      </Button>
                    )}
                  </>
                )}
                {!shareButtonExists && showWishlist && (
                  <Button
                    icon
                    style={{
                      position: "absolute",
                      zIndex: 1000,
                      top: "0px",
                      right: "0px",
                      cursor: "pointer",
                      border: "none",
                      backgroundColor: "rgba(0,0,0,0)",
                      color: wishlist.includes(product.id) ? "red" : "white",
                    }}
                    onClick={() => addToWishList(product)}
                  >
                    <Icon name="heart" />
                  </Button>
                )}
              </Grid.Row>
              <br />
              <Grid.Row textAlign="center">
                <h3>
                  {" "}
                  {product?.name}{" "}
                  <Button
                    icon
                    basic
                    color="black"
                    floated="right"
                    onClick={() => addToCart(product)}
                    disabled={product?.stock_quantity === 0}
                  >
                    {" "}
                    <Icon name="cart" />{" "}
                  </Button>{" "}
                </h3>
                <div>{product?.description}</div>
                <strong>
                  {" "}
                  {currency} {product?.price}{" "}
                </strong>
              </Grid.Row>
            </Grid.Column>
          ))
        ) : (
          <Card style={{ height: "300px" }}>
            <Card.Content>
              <Card.Header>No Product Data </Card.Header>
            </Card.Content>
          </Card>
        )}
      </Grid>
      {productData?.length > 0 && count > productData?.length && (
        <Container text textAlign="center" fluid style={{ paddingTop: 30 }}>
          <Button
            animated="vertical"
            onClick={() => fetchMore()}
            circular
            primary
          >
            <Button.Content visible> SHOW MORE </Button.Content>
            <Button.Content hidden>
              <Icon name="arrow down" />
            </Button.Content>
          </Button>
        </Container>
      )}
    </>
  );
};

export default ProductCard;
