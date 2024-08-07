import React, { useState } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Table,
} from "semantic-ui-react";

const AdminCategory = ({
  categoryData,
  tablecolumns,
  addCategory,
  editCategory,
  deleteCategory,
}) => {
  return (
    <Container>
      <Header as="h2">
        Categories
        <Button
          color="blue"
          style={{ marginLeft: 10 }}
          onClick={() => addCategory()}
          floated="right"
        >
          Add Category
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
          {categoryData.map((row, rowIndex) => (
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
                  onClick={() => editCategory(row)}
                  style={{ cursor: "pointer", marginRight: "10px" }}
                />
                <Icon
                  color="red"
                  name="trash alternate"
                  size="large"
                  onClick={() => deleteCategory(row)}
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

export default AdminCategory;
