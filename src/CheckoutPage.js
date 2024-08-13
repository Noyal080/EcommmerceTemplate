import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  List,
  Message,
  Modal,
  Radio,
  Segment,
  Step,
} from "semantic-ui-react";

const Checkout = ({ items, userData, onSubmit, currency, renderPayment }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    city: "",
    address: "",
    postalCode: "",
    country: "",
    state: "",
  });
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData?.name,
        phone: userData?.phone,
      });
      const profileAddress = {
        city: userData?.city,
        address: userData?.address,
        postalCode: userData?.postal_code,
        country: userData?.country,
        state: userData?.state,
      };
      setAddresses([profileAddress]);
      setSelectedAddress(profileAddress);
    }
  }, [userData]);

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddNewAddress = () => {
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress);
    setNewAddress({
      city: "",
      address: "",
      postalCode: "",
      country: "",
      state: "",
    });
    setShowNewAddressForm(false);
  };

  const formatAddress = (address) => {
    const { address: addr, city, state, postalCode, country } = address;
    const parts = [addr, city, state, postalCode, country].filter(
      (part) => part && part.trim() !== ""
    );
    return parts.join(", ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData, selectedAddress);
  };

  return (
    <Grid container stackable columns={2}>
      <Grid.Column width={10}>
        <Step.Group widths={2}>
          <Step active={step === 1}>
            <Step.Content>
              <Step.Title>Personal Information</Step.Title>
              <Step.Description>Enter your personal details</Step.Description>
            </Step.Content>
          </Step>
          <Step active={step === 2}>
            <Step.Content>
              <Step.Title>Payment Information</Step.Title>
              <Step.Description>Enter your payment details</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
        {step === 1 ? (
          <Form>
            <Form.Input
              label="Full Name"
              placeholder="Full Name"
              name="name"
              value={formData?.name}
              onChange={handleChange}
            />
            <Form.Input
              label="Phone Number"
              placeholder="Phone Number"
              name="phone"
              value={formData?.phone}
              onChange={handleChange}
            />
            <Segment>
              <Header as={"h4"}>Delivery Address</Header>
              <Container>
                {addresses?.length > 0 ? (
                  addresses?.map((address, index) => {
                    const formattedAddress = formatAddress(address);
                    if (formattedAddress) {
                      return (
                        <Container as={Header} key={index}>
                          <Radio
                            label={formattedAddress}
                            name="address"
                            value={address}
                            checked={selectedAddress === address}
                            onChange={() => setSelectedAddress(address)}
                          />
                        </Container>
                      );
                    }
                    return null;
                  })
                ) : (
                  <Message as="h5" color="red">
                    Please add a new address.
                  </Message>
                )}
              </Container>
              <Modal
                open={showNewAddressForm}
                onClose={() => setShowNewAddressForm(false)}
                dimmer="inverted"
                size="small"
              >
                <Modal.Header>Set New Address</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Group widths={"equal"}>
                      <Form.Input
                        label="Address"
                        name="address"
                        value={newAddress.address}
                        onChange={handleNewAddressChange}
                      />
                      <Form.Input
                        label="City"
                        name="city"
                        value={newAddress.city}
                        onChange={handleNewAddressChange}
                      />
                      <Form.Input
                        label="State"
                        name="state"
                        value={newAddress.state}
                        onChange={handleNewAddressChange}
                      />
                    </Form.Group>
                    <Form.Group widths={"equal"}>
                      <Form.Input
                        label="Postal Code"
                        name="postalCode"
                        value={newAddress.postalCode}
                        onChange={handleNewAddressChange}
                      />
                      <Form.Input
                        label="Country"
                        name="country"
                        value={newAddress.country}
                        onChange={handleNewAddressChange}
                      />
                    </Form.Group>
                    <Button onClick={handleAddNewAddress}>
                      Add New Address
                    </Button>
                  </Form>
                </Modal.Content>
              </Modal>
              <Button onClick={() => setShowNewAddressForm(true)}>
                Add New Address
              </Button>
            </Segment>
            <Button primary onClick={nextStep}>
              Next
            </Button>
          </Form>
        ) : (
          <>
            {renderPayment}
            <Button onClick={prevStep}>Back</Button>
            <Button primary type="submit" onClick={handleSubmit}>
              Pay Now
            </Button>
          </>
        )}
      </Grid.Column>
      <Grid.Column width={6} style={{ backgroundColor: "#D3D3D3" }}>
        <Segment basic>
          <Header as="h3">Order Summary</Header>
          <List divided relaxed>
            {items?.map((item, index) => (
              <List.Item key={index}>
                <Image
                  src={item.image}
                  size="medium"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <List.Content>
                  <List.Header>{item?.name}</List.Header>
                  <List.Description>
                    Quantity: {item?.quantity}
                    <br />
                    Price: {currency} {item?.price}
                  </List.Description>
                </List.Content>
                <List.Content floated="right">
                  <span>
                    {currency} {item.price * item.quantity}
                  </span>
                </List.Content>
              </List.Item>
            ))}
          </List>
          <Divider />
          <Header as="h2" textAlign="right">
            Total: {currency}
            {items?.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </Header>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
export default Checkout;
