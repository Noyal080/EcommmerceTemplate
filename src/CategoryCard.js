import React from "react";
import { Card } from "semantic-ui-react";
const CategoryCard = ({ categoryData, handleRoute, itemsPerRow }) => {
  return (
    <>
      <Card.Group
        itemsPerRow={4 || itemsPerRow}
        stackable
        style={{ margin: "0px 50px 50px 50px" }}
      >
        {categoryData.length > 0 ? (
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
              <Card.Header>No categories found </Card.Header>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    </>
  );
};

export default CategoryCard;
