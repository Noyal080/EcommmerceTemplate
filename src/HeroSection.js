import React, { useState } from "react";
import { Button, Container, Grid, Header, Input } from "semantic-ui-react";
import BGTHEME from "./BGTheme";
const HeroSection = ({
  bgImage,
  pinnedProduct,
  headerText,
  subText,
  searchPlaceholder,
  handleKeyDown,
  frequentlySearchedItems,
  productTitle,
  handleRoute,
  onPressExplore,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <BGTHEME bgImage={bgImage}>
      <Container>
        <Grid
          style={{ height: "100%" }}
          verticalAlign="middle"
          stackable
          doubling
        >
          <Grid.Column width={10}>
            <h1
              style={{
                fontSize: "2.2em",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {headerText}
            </h1>
            <p style={{ fontSize: "1.2em", color: "white" }}>{subText}</p>
            <Input
              fluid
              icon="search"
              iconPosition="left"
              placeholder={searchPlaceholder}
              style={{ minWidth: 250, maxWidth: "70%", marginBottom: "20px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <p
              style={{
                fontSize: "1.2em",
                color: "white",
                marginTop: "7.5vh",
              }}
            >
              Frequently Searched Items:
            </p>
            <div>
              {frequentlySearchedItems.map((item) => (
                <Button
                  key={item.label}
                  as="a"
                  href={item.link}
                  style={{
                    margin: "5px",
                    borderRadius: "50px",
                    backgroundColor: "transparent",
                    color: "white",
                    border: "1px solid white",
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </Grid.Column>
          {pinnedProduct?.length > 0 && (
            <Grid.Column
              width={6}
              style={{ backgroundColor: "#E7ECEF", borderRadius: 20 }}
            >
              <Grid.Column width={6}>
                <Header>
                  <small>
                    {productTitle ? productTitle : "HIGHLIGHTED PRODUCTS"}
                  </small>
                </Header>
                <Grid style={{ marginTop: 10 }}>
                  {pinnedProduct?.slice(0, 4).map((product, index) => (
                    <Grid.Column
                      key={index}
                      width={8}
                      onClick={() => handleRoute(product)}
                      style={{
                        textAlign: "center",
                        color: "black",
                        paddingTop: 0,
                      }}
                    >
                      <ImageView url={product?.image} height={120} />
                      <b>{product.name}</b>
                    </Grid.Column>
                  ))}
                </Grid>
                <div style={{ textAlign: "center" }}>
                  <Button
                    color="black"
                    style={{
                      marginTop: "20px",
                    }}
                    size="small"
                    onClick={() => onPressExplore()}
                  >
                    Explore More
                  </Button>
                </div>
              </Grid.Column>
            </Grid.Column>
          )}
        </Grid>
      </Container>
    </BGTHEME>
  );
};

export default HeroSection;
