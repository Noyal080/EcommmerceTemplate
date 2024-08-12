import React from "react";
import {
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Pagination,
  Table,
} from "semantic-ui-react";

const AdminOrder = ({
  orderData,
  tablecolumns,
  updateOrder,
  deleteOrder,
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
      <Header as="h2">Delivery</Header>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {tablecolumns.map((column, index) => (
              <Table.HeaderCell key={index}>{column.header}</Table.HeaderCell>
            ))}
            {(updateOrder || deleteOrder) && (
              <Table.HeaderCell> Actions </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orderData?.length > 0 ? (
            orderData.map((row, rowIndex) => (
              <Table.Row key={rowIndex}>
                {tablecolumns.map((column, colIndex) => (
                  <Table.Cell key={colIndex}>
                    {renderCellContent(column, row, rowIndex)}
                  </Table.Cell>
                ))}
                <Table.Cell>
                  {updateOrder && (
                    <Icon
                      color="blue"
                      size="large"
                      name="edit outline"
                      onClick={() => updateOrder(row)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                  )}
                  {deleteOrder && (
                    <Icon
                      color="red"
                      name="trash alternate"
                      size="large"
                      onClick={() => deleteOrder(row)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={tablecolumns.length + 1} textAlign="center">
                <h3>No Order Details Found</h3>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Grid centered>
        <Pagination
          pointing
          secondary
          activePage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePaginationChange}
        />
      </Grid>
    </Container>
  );
};

export default AdminOrder;
