import React from "react";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";

class ProductStock extends React.Component {
  render() {
    return (
      <Paper
        style={{
          backgroundColor: "lightgray",
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography style={{ fontWeight: "bold" }}>Product Count: </Typography>
        {this.props.productsCount || 0}
      </Paper>
    );
  }
}

export default connect(({ product: { productsCount } }) => ({ productsCount }))(
  ProductStock
);
