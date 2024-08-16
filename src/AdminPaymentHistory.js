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

const AdminPaymentHistory = ({
  paymentData,
  tablecolumns,
  viewPayment,
  currentPage,
  totalPages,
  handlePaginationChange,
  handleChange,
  options,
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
            {viewPayment && <Table.HeaderCell> Actions </Table.HeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paymentData.map((row, rowIndex) => (
            <Table.Row key={rowIndex}>
              {tablecolumns.map((column, colIndex) => (
                <Table.Cell key={colIndex}>
                  {renderCellContent(column, row, rowIndex)}
                </Table.Cell>
              ))}
              <Table.Cell>
                {viewPayment && (
                  <Icon
                    size="large"
                    name="eye"
                    onClick={() => viewPayment(row)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
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

export default AdminPaymentHistory;
