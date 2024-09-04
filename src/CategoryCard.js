import React from "react";
import { Card, Container, Icon, Button } from "semantic-ui-react";
const CategoryCard = ({
  categoryData,
  handleRoute,
  itemsPerRow = 4,
  count = 0,
  fetchMore = () => alert("Fetch More function not added"),
}) => {
  return (
    <>
      <Card.Group
        itemsPerRow={itemsPerRow}
        stackable
        style={{ margin: "0px 50px 50px 50px" }}
      >
        {categoryData?.length > 0 ? (
          categoryData?.map((categories) => (
            <Card
              key={categories?.id}
              onClick={() => handleRoute(categories?.id)}
            >
              <div
                alt={categories.title}
                style={{
                  height: 300,
                  backgroundImage: `url("${categories.image}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <Card.Content>
                <Card.Header>{categories.title}</Card.Header>
                <Card.Meta>{categories.description}</Card.Meta>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Card style={{ height: "300px" }}>
            <Card.Content>
              <Card.Header>No Category data found </Card.Header>
            </Card.Content>
          </Card>
        )}
      </Card.Group>

      {categoryData?.length > 0 && count > categoryData?.length && (
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

export default CategoryCard;
