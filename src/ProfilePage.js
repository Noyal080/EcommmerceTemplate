import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Confirm,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  List,
  Segment,
  TextArea,
} from "semantic-ui-react";

const ProfileEditForm = ({ editForm, setEditForm }) => {
  return (
    <>
      <Form style={{ paddingRight: 50, paddingTop: 20 }}>
        <Form.Group widths={"equal"}>
          <Form.Field>
            <label> First Name </label>
            <Input
              value={editForm?.first_name}
              onChange={(e) => {
                setEditForm({ ...editForm, first_name: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <label> Last Name </label>
            <Input
              value={editForm?.last_name}
              onChange={(e) => {
                setEditForm({ ...editForm, last_name: e.target.value });
              }}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label> Bio </label>
          <TextArea
            value={editForm?.bio}
            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
          />
        </Form.Field>
        <Form.Group widths={"equal"}>
          <Form.Field>
            <label> Email </label>
            <Input
              type="email"
              value={editForm?.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Website </label>
            <Input
              value={editForm?.website}
              onChange={(e) =>
                setEditForm({ ...editForm, website: e.target.value })
              }
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths={"equal"}>
          <Form.Field>
            <label>Contact Number</label>
            <Input
              type="number"
              value={editForm?.contact_number}
              onChange={(e) =>
                setEditForm({ ...editForm, contact_number: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label> Business Name </label>
            <Input
              value={editForm?.business_name}
              onChange={(e) =>
                setEditForm({ ...editForm, business_name: e.target.value })
              }
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths={"equal"}>
          <Form.Field>
            <label>Address</label>
            <Input
              value={editForm?.address}
              onChange={(e) =>
                setEditForm({ ...editForm, address: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <Input
              value={editForm?.city}
              onChange={(e) =>
                setEditForm({ ...editForm, city: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>State</label>
            <Input
              value={editForm?.state}
              onChange={(e) =>
                setEditForm({ ...editForm, state: e.target.value })
              }
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths={"equal"}>
          <Form.Field>
            <label> Postal Code </label>
            <Input
              type="number"
              value={editForm?.postal_code}
              onChange={(e) =>
                setEditForm({ ...editForm, postal_code: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label> Country </label>
            <Input
              value={editForm?.country}
              onChange={(e) =>
                setEditForm({ ...editForm, country: e.target.value })
              }
            />
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  );
};

const ProfilePage = ({
  admin,
  profileData,
  recentOrderData,
  updateProfile,
  handleLogout,
  deleteAccount,
  dashboardLink,
  currency,
  handleOrderClick,
}) => {
  const [editView, setEditView] = useState(false);
  const [editForm, setEditForm] = useState();
  const [openConfirm, setOpenConfirm] = useState(false);
  const imageInput = useRef(null);
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    setEditForm({ ...editForm, profile_pic: file });
  };

  const handleSave = () => {
    setEditView(false);
    updateProfile(editForm);
  };

  const calculateTotalPrice = (order) => {
    return order?.products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };

  const renderAddress = () => {
    const { country, state, city, address, postal_code } = profileData || {};
    const addressParts = [
      country && ` ${country}`,
      state && ` ${state}`,
      city && ` ${city}`,
      address && ` ${address}`,
      postal_code && ` ${postal_code}`,
    ]
      .filter(Boolean)
      .join(",");

    return addressParts ? (
      <Grid.Row>
        <Grid.Column>
          <Icon name="map pin" /> {addressParts}
        </Grid.Column>
      </Grid.Row>
    ) : (
      <Grid.Row>
        <Grid.Column>No address details found</Grid.Column>
      </Grid.Row>
    );
  };

  const renderRecentOrders = () => {
    if (recentOrderData?.length === 0) {
      return <p>No recent orders found.</p>;
    }
    return (
      <Grid columns={3} stackable>
        {recentOrderData?.map((order) => (
          <Grid.Column key={order.id}>
            <Segment
              raised
              onClick={() => handleOrderClick(order)}
              style={{ cursor: "pointer" }}
            >
              <Header as="h3" style={{ color: "#2185d0" }}>
                Order #{order.id}
              </Header>
              <Card fluid>
                <Card.Content>
                  {order.products.map((product, index) => (
                    <Card key={index} style={{ marginBottom: "10px" }}>
                      <Grid>
                        <Grid.Column width={5}>
                          <div
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
                </Card.Content>
                <Card.Content extra>
                  <Header as="h4">
                    Total Price: {currency}{" "}
                    {calculateTotalPrice(order).toFixed(2)}
                  </Header>
                  <p>
                    Order Date:{" "}
                    {new Date(order.order_date).toLocaleDateString()}
                  </p>
                </Card.Content>
              </Card>
            </Segment>
          </Grid.Column>
        ))}
      </Grid>
    );
  };

  return (
    <Container>
      <Header as="h2" icon textAlign="center">
        <Icon name="user circle" circular />
        <Header.Content>User Profile</Header.Content>
      </Header>
      <Segment>
        <Grid doubling divided columns={"equal"}>
          <Grid.Row>
            <Grid.Column width={4}>
              <Grid.Row centered>
                <Grid.Column>
                  <div
                    style={{
                      backgroundImage: `url("${profileData?.profile_pic}")`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      height: "300px",
                      width: "100%",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      // transition: "transform 0.2s",
                    }}
                  />
                  {editView && (
                    <>
                      <input
                        type="file"
                        fluid
                        onChange={(e) => handleProfileChange(e)}
                        ref={imageInput}
                        style={{ display: "none" }}
                      />
                      <Button
                        color="black"
                        fluid
                        style={{ marginTop: 10 }}
                        onClick={() => imageInput.current.click()}
                      >
                        {" "}
                        Upload Profile Image{" "}
                      </Button>
                    </>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <div
                style={{
                  position: "absolute",
                  right: 5,
                  top: 0,
                  zIndex: 1,
                }}
              >
                {editView ? (
                  <>
                    <Button
                      primary
                      basic
                      icon="save outline"
                      onClick={() => handleSave()}
                    />
                    <Button
                      negative
                      basic
                      icon="close"
                      onClick={() => setEditView(false)}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      primary
                      basic
                      icon="edit outline"
                      onClick={() => {
                        setEditView(true);
                        setEditForm(profileData);
                      }}
                    />
                    <Button
                      negative
                      basic
                      onClick={() => setOpenConfirm(true)}
                      icon
                      className="animated-button"
                    >
                      <Icon name="trash alternate" />
                      Delete this Account
                    </Button>

                    <Button
                      color="violet"
                      basic
                      icon
                      onClick={() => handleLogout()}
                    >
                      {" "}
                      <Icon name="log out" />
                      Sign Out
                    </Button>
                    {admin && (
                      <Button onClick={() => dashboardLink()} basic secondary>
                        Go to Dashboard
                      </Button>
                    )}
                  </>
                )}
              </div>
              {editView ? (
                <ProfileEditForm
                  editForm={editForm}
                  setEditForm={setEditForm}
                />
              ) : (
                <div>
                  <h3> Profile Details </h3>
                  <Grid>
                    {profileData?.first_name && profileData?.last_name && (
                      <Grid.Row>
                        <Grid.Column>
                          <span>
                            <b> Name: </b> {profileData?.first_name}{" "}
                            {profileData?.last_name}
                          </span>
                        </Grid.Column>
                      </Grid.Row>
                    )}
                    {profileData?.bio && (
                      <Grid.Row>
                        <Grid.Column>
                          <span>
                            <b>Bio: </b>
                            {profileData.bio}
                          </span>
                        </Grid.Column>
                      </Grid.Row>
                    )}
                    {profileData?.email && (
                      <Grid.Row>
                        <Grid.Column>
                          <span>
                            <b> Email: </b>
                            {profileData?.email}
                          </span>
                        </Grid.Column>
                      </Grid.Row>
                    )}

                    {profileData?.business_name && (
                      <Grid.Row>
                        <Grid.Column>
                          <span>
                            <b>Business Name: </b>
                            {profileData?.business_name}
                          </span>
                        </Grid.Column>
                      </Grid.Row>
                    )}
                    {profileData?.website && (
                      <Grid.Row>
                        <Grid.Column>
                          <span>
                            <b>Website: </b> {profileData?.website}
                          </span>
                        </Grid.Column>
                      </Grid.Row>
                    )}
                    {profileData?.contact_number && (
                      <Grid.Row>
                        <Grid.Column>
                          <span>
                            {" "}
                            <b> Contact Number: </b>{" "}
                            {profileData?.contact_number}{" "}
                          </span>
                        </Grid.Column>
                      </Grid.Row>
                    )}
                    <Grid.Row>
                      <Grid.Column>
                        <Segment style={{ marginTop: 5 }}>
                          <Header as={"h4"}>Address Detail</Header>
                          <Grid>{renderAddress()}</Grid>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>

                    <Confirm
                      open={openConfirm}
                      onCancel={() => setOpenConfirm(false)}
                      onConfirm={() => {
                        deleteAccount();
                        setOpenConfirm(false);
                      }}
                      content="Are you sure you want to delete your account? This action cannot be undone."
                    />
                  </Grid>
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      {!admin && (
        <Segment>
          <Header as={"h3"}>Recent Orders</Header>
          {renderRecentOrders()}
        </Segment>
      )}
    </Container>
  );
};

export default ProfilePage;
