import React from "react";
import OrderListTemplate from "./OrderListTemplate";
import { Card, Divider, Segment } from "semantic-ui-react";
import "./OrderDetailView.css";

const OrderDetailView = ({
  orderData = [],
  customerData,
  addressData,
  paymentData,
}) => {
  return (
    <div className="admin-order-details-container">
      {/* Left Side: Order Summary */}
      <div className="admin-order-details-summary">
        <OrderListTemplate orderData={orderData} />
      </div>

      {/* Right Side: Customer, Address, Payment Details */}
      <div className="admin-order-details-info">
        <Segment basic className="admin-segment">
          {/* Customer Details */}
          <Card fluid>
            <Card.Content>
              <Card.Header>Customer Details</Card.Header>
              <Divider />
              {customerData?.length > 0 ? (
                <Card.Description>
                  <p>Name: {customerData.name}</p>
                  <p>Email: {customerData.email}</p>
                  <p>Phone: {customerData.phone}</p>
                </Card.Description>
              ) : (
                <Card.Description>No User Data</Card.Description>
              )}
            </Card.Content>
          </Card>

          {/* Delivery Address */}
          <Card fluid>
            <Card.Content>
              <Card.Header>Delivery Address</Card.Header>
              <Divider />
              {addressData?.length > 0 ? (
                <Card.Description>
                  <p>{addressData.country}</p>
                  <p>
                    {addressData.address} {addressData.city},{" "}
                    {addressData.state} {addressData.postalCode}
                  </p>
                </Card.Description>
              ) : (
                <Card.Description>No Address Found</Card.Description>
              )}
            </Card.Content>
          </Card>

          {/* Payment Details */}
          <Card fluid>
            <Card.Content>
              <Card.Header>Payment Details</Card.Header>
              <Divider />
              {paymentData?.length > 0 ? (
                <Card.Description>
                  <p>Method: {paymentData.method}</p>
                  <p>Card Number: {paymentData.cardNumber}</p>
                </Card.Description>
              ) : (
                <Card.Description>No Payment Data found</Card.Description>
              )}
            </Card.Content>
          </Card>
        </Segment>
      </div>
    </div>
  );
};
export default OrderDetailView;
