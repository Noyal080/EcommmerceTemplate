import React from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Pagination,
  Table,
  Dropdown,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const AdminProduct = ({
  productData,
  tablecolumns,
  addProduct,
  editProduct,
  deleteProduct,
  currentPage,
  totalPages,
  handlePaginationChange,
  options,
  handleChange,
}) => {
  const renderCellContent = (column, row, rowIndex) => {
    switch (column.type) {
      case "image":
        return (
          <Image src={row[column.header.toLowerCase()]} centered size="small" />
        );
      case "dropdown":
        return (
          <Dropdown
            options={options}
            value={row[column.header.toLowerCase()]}
            fluid
            selection
            onChange={(e, { value }) =>
              handleChange(e, { value }, column.header.toLowerCase(), rowIndex)
            }
          />
        );
      default:
        return row[column.header.toLowerCase()];
    }
  };
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
            {tablecolumns?.map((column, index) => (
              <Table.HeaderCell key={index}>{column.header}</Table.HeaderCell>
            ))}
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {productData?.length > 0 ? (
            productData?.map((row, rowIndex) => (
              <Table.Row key={rowIndex}>
                {tablecolumns.map((column, colIndex) => (
                  <Table.Cell key={colIndex}>
                    {renderCellContent(column, row, rowIndex)}
                  </Table.Cell>
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
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={tablecolumns.length + 1} textAlign="center">
                <h3>No Products Found</h3>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {totalPages > 1 && (
        <Grid centered>
          <Pagination
            pointing
            secondary
            activePage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePaginationChange}
          />
        </Grid>
      )}
    </Container>
  );
};

export default AdminProduct;
