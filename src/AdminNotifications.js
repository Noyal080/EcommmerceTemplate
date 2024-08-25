import React from "react";
import { Container, Header, List, Message, Segment } from "semantic-ui-react";
const AdminNotifications = ({ notifications }) => {
  return (
    <Container>
      <Header as="h3">Notifications</Header>

      <Segment>
        <List divided size="large">
          {notifications?.length === 0 && (
            <Message info> No notifications are available. </Message>
          )}
          {notifications.map((notification) => (
            <List.Item key={notification.id}>
              <List.Icon
                name={
                  notification.type === "info"
                    ? "info circle"
                    : notification.type === "warning"
                    ? "warning circle"
                    : "check circle outline"
                }
                color={
                  notification.type === "info"
                    ? "blue"
                    : notification.type === "warning"
                    ? "yellow"
                    : "green"
                }
              />
              <List.Content>
                <List.Header>{notification.title}</List.Header>
                <List.Description>{notification.message}</List.Description>
                {notification.link && (
                  <List.Item>
                    <a href={notification.link}>View Details</a>
                  </List.Item>
                )}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </Container>
  );
};

export default AdminNotifications;
