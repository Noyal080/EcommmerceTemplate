import React, { useState } from "react";
import {
  Button,
  Comment,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Rating,
  Segment,
  Statistic,
  Tab,
  TextArea,
} from "semantic-ui-react";

const ProductDetailTemplate = ({
  productData,
  addtoCart,
  buyNow,
  currency,
  shareExist,
  shareButton,
  quantity,
  setQuantity,
  size,
  reviewData,
  discussiondata,
  changeRating,
  addComment,
  handleAddDiscussion,
}) => {
  const certificates_conditions = productData?.certifications;
  const organic_conditions = productData?.organic;
  const bulkDiscount_condition = productData?.bulk_discount;
  const all_conditions =
    certificates_conditions && organic_conditions && bulkDiscount_condition;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= productData?.min_order_quantity) {
      setQuantity(newQuantity);
    }
  };
  const [review, setReviewComment] = useState("");
  const [newDiscussion, setNewDiscussion] = useState("");

  const panes = [
    {
      menuItem: "Description",
      render: () => (
        <Tab.Pane attached={false}>
          <div style={{ padding: "20px" }}>
            <p style={{ fontSize: "16px" }}>{productData?.description}</p>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Statistic horizontal size={"small"}>
                    <Statistic.Value>
                      {currency}
                      {productData?.price}
                    </Statistic.Value>
                    <Statistic.Label>Cost per Unit</Statistic.Label>
                  </Statistic>
                  <p>Min. Order Quantity: {productData?.min_order_quantity}</p>
                </Grid.Column>
                {shareExist && (
                  <Grid.Column width={8} textAlign="right">
                    {shareButton}
                  </Grid.Column>
                )}
              </Grid.Row>
              {all_conditions && (
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
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Reviews",
      render: () => (
        <Tab.Pane attached={false}>
          <div style={{ padding: "10px" }}>
            <Header as="h3">Reviews</Header>
            <Comment.Group>
              {reviewData?.map((review) => (
                <Comment key={review.id}>
                  <Comment.Content>
                    <Comment.Author>{review.user} </Comment.Author>
                    <Comment.Metadata>
                      <Rating
                        icon="star"
                        defaultRating={review.rating}
                        maxRating={4}
                        disabled
                      />
                    </Comment.Metadata>
                    <Comment.Text>{review.comment}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}
            </Comment.Group>
            <Divider />
            <Header as="h3">Leave your Review</Header>
            <Form>
              <Form.Field>
                <label>Rating</label>
                <Rating
                  icon="star"
                  defaultRating={0}
                  maxRating={5}
                  onRate={(e, { rating }) => changeRating(rating)}
                />
              </Form.Field>
              <Form.Field>
                <label>Comment (optional)</label>
                <TextArea
                  placeholder="Leave a comment"
                  value={review}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </Form.Field>
              <Button primary onClick={() => addComment()}>
                Add Review
              </Button>
            </Form>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Discussion",
      render: () => (
        <Tab.Pane attached={false}>
          <div style={{ padding: "10px" }}>
            <Header as="h3">Discussions</Header>
            <Comment.Group>
              {discussiondata?.map((discussion) => (
                <Comment key={discussion.id}>
                  <Comment.Content>
                    <Comment.Author>{discussion.user}</Comment.Author>
                    <Comment.Text>{discussion.content}</Comment.Text>

                    <Comment.Group>
                      {discussion.replies.map((reply) => (
                        <Comment key={reply.id}>
                          <Comment.Content>
                            <Comment.Author>{reply.user}</Comment.Author>
                            <Comment.Text>{reply.content}</Comment.Text>
                          </Comment.Content>
                        </Comment>
                      ))}
                    </Comment.Group>
                  </Comment.Content>
                </Comment>
              ))}
            </Comment.Group>
            <Divider />

            <Header as="h3">Start a Discussion</Header>
            <Form>
              <Form.Field>
                <TextArea
                  placeholder="Start a new discussion"
                  style={{ minHeight: 100 }}
                  value={newDiscussion}
                  onChange={(e) => setNewDiscussion(e.target.value)}
                />
              </Form.Field>
              <Button
                primary
                onClick={() => handleAddDiscussion(newDiscussion)}
              >
                Add Discussion
              </Button>
            </Form>
          </div>
        </Tab.Pane>
      ),
    },
  ];

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
            <Image
              src={productData?.image}
              alt={productData?.name}
              size={size || "huge"}
              style={{ display: "block" }}
            />
          </div>
          <Header as="h2">{productData?.name}</Header>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Grid.Column>

        <Grid.Column width={8}>
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
                        value={quantity}
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
                      <b>Cost per Unit:</b> {currency} {productData?.price}
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
                      <Icon name="in cart" />
                      Add to Cart
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ProductDetailTemplate;
