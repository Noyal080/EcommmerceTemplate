import React from "react";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Statistic,
} from "semantic-ui-react";
import MultipleImagePlayer from "./MultipleImagePlayer";
const ProductDetails = ({
  productData = [],
  addtoCart = () => alert("Add to Cart function not added"),
  buyNow = () => alert("Buy now function not added"),
  currency = "Rs.",
  shareExist,
  shareButton,
  quantity = 1,
  setQuantity,
  size,
}) => {
  const certificates_conditions = productData?.certifications;

  const organic_conditions = productData?.organic;

  const bulkDiscount_condition = productData?.bulk_discount;

  const all_condtions =
    certificates_conditions && organic_conditions && bulkDiscount_condition;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= productData?.min_order_quantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Grid columns={2} stackable doubling>
      <Grid.Row>
        <Grid.Column width={8}>
          <div style={{ position: "relative", display: "inline-block" }}>
            {productData?.stock_quantity === 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "red",
                  fontWeight: "bold",
                  backgroundColor: "rgba(255, 255, 255, 2)",
                  padding: "5px",
                  borderRadius: "5px",
                  zIndex: 1,
                }}
              >
                Out of Stock
              </div>
            )}
            {productData?.image ? (
              <Image
                src={
                  productData?.image ||
                  "https://via.placeholder.com/800x400.png?text=Product+Image "
                }
                alt={productData?.name}
                size={size || "huge"}
                style={{ display: "block" }}
              />
            ) : (
              <MultipleImagePlayer
                images={
                  productData?.images || [
                    "https://via.placeholder.com/800x400.png?text=Product+Image+1 ",
                    "https://via.placeholder.com/800x400.png?text=Product+Image ",
                  ]
                }
              />
            )}
          </div>
          <Header as="h2">{productData?.name}</Header>
          <p>{productData?.description}</p>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Statistic horizontal size={"small"}>
                  <Statistic.Value>
                    {currency}
                    {productData?.price ? productData?.price : 0}
                  </Statistic.Value>
                  <Statistic.Label>Cost per Unit</Statistic.Label>
                </Statistic>
                <p>
                  Min. Order Quantity:{" "}
                  {productData?.min_order_quantity
                    ? productData?.min_order_quantity
                    : 1}
                </p>
              </Grid.Column>
              {shareExist && (
                <Grid.Column width={8} textAlign="right">
                  {/* <Button
                      basic
                      icon="star outline"
                      onClick={handleOpenReviewModal}
                    />
                    {`  ${reviews.length} Reviews`} */}
                  {shareButton}
                </Grid.Column>
              )}
            </Grid.Row>
            {all_condtions && (
              <Grid.Row>
                <Grid.Column>
                  {certificates_conditions && (
                    <p>
                      <Icon name="certificate" /> Certifications:{" "}
                      {productData?.certifications}
                    </p>
                  )}
                  {organic_conditions && (
                    <p>
                      <Icon name="leaf" /> Organic Certified
                    </p>
                  )}
                  {bulkDiscount_condition && (
                    <p>
                      Bulk Discounts Available! See details on product inquiry
                      with supplier.
                    </p>
                  )}
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        </Grid.Column>
        <Grid.Column width={8}>
          <Grid>
            <Grid>
              <Segment padded>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Header as="h3">
                        <Icon name="shopping cart" />
                        <Header.Content>
                          You are about to order:
                          <Header.Subheader>
                            <i>{productData?.name}</i>
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Grid.Column>
                  </Grid.Row>

                  {/* <Divider />
                      <Grid.Row>
                        <Grid.Column>
                          <h3> Select Shoe size </h3>
                          <div>
                            {shoeSize?.map((shoe) => (
                              <Button
                                basic={selectedShoeSize !== shoe?.size}
                                color="black"
                                onClick={() => setSelectedShoeSize(shoe.size)}
                                disabled={!shoe.available}
                              >
                                {shoe.size}
                              </Button>
                            ))}
                          </div>
                        </Grid.Column>
                      </Grid.Row>
                      <Divider />
                      <Grid.Row>
                        <Grid.Column>
                          <h3> Select Shoe Color </h3>
                          <div>
                            {colors.map((color) => (
                              <Button
                                size="big"
                                circular
                                color={color.name}
                                icon
                                onClick={() => setSelectedColor(color)}
                              >
                                <Icon
                                  name={
                                    selectedColor?.name === color?.name
                                      ? "checkmark"
                                      : ""
                                  }
                                />
                              </Button>
                            ))}
                          </div>
                        </Grid.Column>
                      </Grid.Row> */}
                  <Divider />
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <h3>Order Quantity:</h3>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Button
                          icon="minus"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          size="small"
                          disabled={quantity <= productData?.min_order_quantity}
                        />
                        <input
                          type="number"
                          min={productData?.min_order_quantity}
                          value={quantity || 0}
                          onChange={(e) =>
                            handleQuantityChange(parseInt(e.target.value))
                          }
                          style={{
                            width: "100px",
                            textAlign: "center",
                            padding: 5,
                            margin: 10,
                          }}
                        />
                        <Button
                          icon="plus"
                          size="small"
                          onClick={() => handleQuantityChange(quantity + 1)}
                        />
                      </div>
                    </Grid.Column>
                  </Grid.Row>

                  <Divider />

                  <Grid.Row>
                    <Grid.Column width={16}>
                      <p style={{ fontSize: 16 }}>
                        <b>Cost per Unit:</b> {currency}{" "}
                        {productData?.price ? productData?.price : 0}
                      </p>
                    </Grid.Column>
                  </Grid.Row>

                  <Divider />

                  <Grid.Row>
                    <Grid.Column width={16}>
                      <p style={{ fontSize: 16 }}>
                        <b>Total Cost:</b> {currency}{" "}
                        {productData?.price * quantity}
                      </p>
                      <p style={{ fontSize: 14, color: "grey" }}>
                        <i>
                          <b>Note</b>: The price above is inclusive of VAT
                        </i>
                      </p>
                    </Grid.Column>
                  </Grid.Row>

                  <Divider />

                  <Grid.Row>
                    <Grid.Column width={16} textAlign="center">
                      <Button
                        primary
                        content="Buy Now"
                        onClick={() => buyNow()}
                        disabled={productData?.stock_quantity === 0}
                      />
                      <Button
                        color="black"
                        icon
                        labelPosition="right"
                        onClick={() => addtoCart()}
                        disabled={productData?.stock_quantity === 0}
                      >
                        {" "}
                        <Icon name="in cart" />
                        Add to Cart{" "}
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ProductDetails;
