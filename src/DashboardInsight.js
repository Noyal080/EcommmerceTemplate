import React from "react";
import { Grid, Header, Icon } from "semantic-ui-react";

const DashboardInsightCard = ({ itemData }) => {
  return (
    <Grid
      stretched
      columns={"equal"}
      doubling
      stackable
      style={{ margin: "0.5rem" }}
      centered
    >
      <Grid.Row centered>
        {itemData?.length > 0 ? (
          itemData?.map((items, index) => (
            <Grid.Column key={index}>
              <div
                style={{
                  height: "14rem",
                  borderRadius: "1rem",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid #ddd",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Header as={"h2"}>{items?.title}</Header>
                  {items?.icon && <Icon name={items.icon} size="large" />}
                </div>

                <div>
                  <span style={{ fontSize: "2rem", color: "#333" }}>
                    {items?.total}
                  </span>
                  {items?.description && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#777",
                        marginTop: "0.5rem",
                      }}
                    >
                      {items.description}
                    </p>
                  )}
                </div>

                {items?.percentage ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    <span
                      style={{
                        background: items?.profit ? "#E0FAEB" : "#FDF4F6",
                        padding: "0.5rem 1rem",
                        color: items?.profit ? "#21ba45" : "#db2828",
                        borderRadius: "0.5rem",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Icon name={items?.profit ? "arrow up" : "arrow down"} />
                      {items?.percentage}
                    </span>
                  </div>
                ) : (
                  items?.timestamp && (
                    <div
                      style={{
                        marginTop: "1rem",
                        fontSize: "0.8rem",
                        color: "#999",
                      }}
                    >
                      Last updated: {items.timestamp}
                    </div>
                  )
                )}
              </div>
            </Grid.Column>
          ))
        ) : (
          <div
            style={{
              height: "14rem",
              borderRadius: "1rem",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid #ddd",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Header as={"h2"}>No Insights Item found</Header>
            </div>
          </div>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default DashboardInsightCard;
