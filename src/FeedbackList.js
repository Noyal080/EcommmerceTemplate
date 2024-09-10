import React, { useState } from "react";
import { List, Pagination, Segment, Header } from "semantic-ui-react";

const FeedbackList = ({ title, feedbackData }) => {
  const itemsPerPage = 5;
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (e, { activePage }) => setActivePage(activePage);

  const totalPages = Math.ceil(feedbackData.length / itemsPerPage);
  const displayedFeedback = feedbackData.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Segment>
      <Header as="h3">{title}</Header>
      {displayedFeedback.length > 0 ? (
        <>
          <List divided relaxed>
            {displayedFeedback.map((feedback, index) => (
              <List.Item key={index}>
                <List.Icon name="comment" size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header>{feedback.title || "Feedback"}</List.Header>
                  <List.Description>{feedback.message}</List.Description>
                  <List.Description>{`Status: ${feedback.status}`}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
          <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            style={{ marginTop: "1em" }}
          />
        </>
      ) : (
        <p>No feedback available.</p>
      )}
    </Segment>
  );
};

export default FeedbackList;
