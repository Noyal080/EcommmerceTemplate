import React, { useState } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Table,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const AdminProduct = ({
  productData,
  tablecolumns,
  addProduct,
  editProduct,
  deleteProduct,
}) => {
  return (
    <Container>
      <Header as="h2">
        Products
        <Button
          color="blue"
          style={{ marginLeft: 10 }}
          onClick={() => addProduct()}
          floated="right"
        >
          Add Product
        </Button>
      </Header>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {tablecolumns.map((column, index) => (
              <Table.HeaderCell key={index}>{column.header}</Table.HeaderCell>
            ))}
            <Table.HeaderCell> Actions </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {productData.map((row, rowIndex) => (
            <Table.Row key={rowIndex}>
              {tablecolumns.map((column, colIndex) => (
                <>
                  {column.key === "image" ? (
                    <Table.Cell key={colIndex}>
                      {" "}
                      <Image src={row[column.key]} centered size="small" />{" "}
                    </Table.Cell>
                  ) : (
                    <Table.Cell key={colIndex}>{row[column.key]}</Table.Cell>
                  )}
                </>
              ))}
              <Table.Cell>
                <Icon
                  color="blue"
                  size="large"
                  name="edit outline"
                  onClick={() => editProduct(row)}
                  style={{ cursor: "pointer", marginRight: "10px" }}
                />
                <Icon
                  color="red"
                  name="trash alternate"
                  size="large"
                  onClick={() => deleteProduct(row)}
                  style={{ cursor: "pointer" }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default AdminProduct;
