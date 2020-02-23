import React, { Fragment } from "react";
import Title from "../utils/Title";
import { Paper, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/styles";

class ProductList extends React.Component {
  render() {
    const { classes, id } = this.props;
    return (
      <Paper
        className={classes.paper}
        style={{
          width: "30%",
          margin: 30
        }}
      >
        <Title label="Products" />
        <ListDividers
          products={this.props.products || []}
          handleProductSelect={product =>
            this.props.handleProductSelect(product)
          }
          id={id}
        />
      </Paper>
    );
  }
}

const styles = {
  paper: {
    height: "100vh",
    backgroundColor: "white",
    border: "1px solid #3f51b5"
  }
};

export default withStyles(styles)(ProductList);

class ListDividers extends React.Component {
  render() {
    return (
      <List style={{ height: "90%", overflow: "scroll" }}>
        {this.props.products.map((product, index) => (
          <Fragment key={product.id}>
            <div
              style={{
                display: "flex",
                padding: 10,
                justifyContent: "space-between",
                backgroundColor:
                  this.props.id === product.id ? "#3f51b5" : "white",
                cursor: "pointer"
              }}
              onClick={() => this.props.handleProductSelect(product.id)}
            >
              {[product.name, product.price].map((ele, ind) => (
                <Typography
                  style={{
                    color: this.props.id === product.id ? "white" : "black"
                  }}
                  key={index + ele}
                >
                  {ind > 0 ? "$" : ""}
                  {ele}
                </Typography>
              ))}
            </div>
            <Divider />
          </Fragment>
        ))}
      </List>
    );
  }
}
