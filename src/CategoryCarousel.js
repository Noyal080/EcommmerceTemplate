import React, { useState } from "react";
import { Button, Card, Container, Loader } from "semantic-ui-react";
import BGTHEME from "./BGTheme";
const CategoryCarousel = ({
  categoryData = [],
  handleRoute = () => alert("Route for category not handled"),
  onPressExplore = () => alert("Explore Route not added"),
  bgImage,
}) => {
  const [position, setPosition] = useState(0);

  const handleSlideLeft = () => {
    if (position === 0) {
      setPosition(Math.ceil(categoryData.length / 4) - 1);
    } else {
      setPosition(position - 1 < 0 ? 0 : position - 1);
    }
  };

  const handleSlideRight = () => {
    if (Math.ceil(categoryData.length / 4) - 1 === position) {
      setPosition(0);
    } else {
      setPosition(
        position + 1 > Math.ceil(categoryData.length / 4) - 1
          ? Math.ceil(categoryData.length / 4) - 1
          : position + 1
      );
    }
  };

  return (
    <BGTHEME bgImage={bgImage}>
      <div style={{ position: "relative" }}>
        <Container>
          <Button
            color="white"
            icon="angle left"
            onClick={handleSlideLeft}
            style={{
              borderRadius: 100,
              boxShadow: "1px 1px 10px #666",
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
            }}
          />
          <Button
            color="white"
            icon="angle right"
            onClick={handleSlideRight}
            style={{
              borderRadius: 100,
              boxShadow: "1px 1px 10px #666",
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
            }}
          />
          <Card.Group itemsPerRow={4} stackable style={{ margin: 30 }}>
            {!categoryData ? (
              <Card style={{ height: "200px" }}>
                <Card.Content>
                  <Card.Header>
                    <Loader active inline />
                  </Card.Header>
                </Card.Content>
              </Card>
            ) : categoryData?.length > 0 ? (
              categoryData
                ?.slice(position * 4, position * 4 + 4)
                .map((category) => (
                  <Card key={category.id} onClick={() => handleRoute(category)}>
                    <div
                      style={{
                        backgroundImage: `url('${category.image}')`,
                        height: 200,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                    <Card.Content
                      textAlign="center"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      {category.title}
                    </Card.Content>
                  </Card>
                ))
            ) : (
              <Card style={{ height: "200px" }}>
                <Card.Content>
                  <Card.Header>No Category Data Found</Card.Header>
                </Card.Content>
              </Card>
            )}
          </Card.Group>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => onPressExplore()}
              color="white"
              style={{
                marginBottom: 50,
                backgroundColor: "white",
                color: "black",
              }}
            >
              {" "}
              Explore More{" "}
            </Button>
          </div>
        </Container>
      </div>
    </BGTHEME>
  );
};

export default CategoryCarousel;
