import React, { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Pagination,
  Table,
} from "semantic-ui-react";

const AdminTable = ({
  data,
  tablecolumns,
  addBtnName,
  addData,
  editData,
  deleteData,
  viewData,
  currentPage,
  totalPages,
  handlePaginationChange,
  options,
  handleChange,
  title,
  noItemMsg,
  handleToggleChange,
  searchBar,
  handleSearchChange,
  searchEvent,
  setSearchEvent,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const renderCellContent = (column, row, rowIndex) => {
    const dataKey = column.key;

    if (column.render) {
      return column.render(row, categories);
    }

    switch (column.type) {
      case "image":
        return <Image src={row[dataKey]} centered size="small" />;
      case "dropdown":
        return (
          <Dropdown
            options={options}
            value={row[dataKey]}
            fluid
            selection
            onChange={(e, { value }) =>
              handleChange(e, { value }, dataKey, rowIndex)
            }
          />
        );
      case "checkbox":
        return (
          <Checkbox
            toggle
            checked={row[dataKey]}
            onChange={() => handleToggleChange(row[dataKey])}
          />
        );
      default:
        return row[dataKey];
    }
  };
  return (
    <Container>
      <Header as="h2">
        {title}
        {searchBar ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ position: "relative", width: "60%" }}>
              <Input
                icon="search"
                iconPosition="left"
                placeholder="Search products..."
                style={{ marginRight: "10px", width: "100%" }}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearchChange(e.target.value);
                  setSearchEvent(false);
                }}
              />
              {searchTerm && (
                <Icon
                  name="close"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSearchTerm("");
                    setSearchEvent(true);
                  }}
                />
              )}
            </div>
            {addBtnName && (
              <Button
                color="blue"
                style={{ marginLeft: 10 }}
                onClick={() => addData()}
                floated="right"
              >
                {addBtnName}
              </Button>
            )}
          </div>
        ) : (
          addBtnName && (
            <Button
              color="blue"
              style={{ marginLeft: 10 }}
              onClick={() => addData()}
              floated="right"
            >
              {addBtnName}
            </Button>
          )
        )}
      </Header>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {tablecolumns?.map((column, index) => (
              <Table.HeaderCell key={index}>{column?.header}</Table.HeaderCell>
            ))}
            {(editData || deleteData || viewData) && (
              <Table.HeaderCell> Actions </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.length > 0 ? (
            data?.map((row, rowIndex) => (
              <Table.Row key={rowIndex}>
                {tablecolumns.map((column, colIndex) => (
                  <Table.Cell key={colIndex}>
                    {renderCellContent(column, row, rowIndex)}
                  </Table.Cell>
                ))}
                {(editData || deleteData || viewData) && (
                  <Table.Cell>
                    {viewData && (
                      <Icon
                        size="large"
                        name="eye outline"
                        onClick={() => viewData(row)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      />
                    )}
                    {editData && (
                      <Icon
                        color="blue"
                        size="large"
                        name="edit outline"
                        onClick={() => editData(row)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      />
                    )}
                    {deleteData && (
                      <Icon
                        color="red"
                        name="trash alternate"
                        size="large"
                        onClick={() => deleteData(row)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </Table.Cell>
                )}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={tablecolumns.length + 1} textAlign="center">
                <h3> {noItemMsg} </h3>
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
export default AdminTable;
