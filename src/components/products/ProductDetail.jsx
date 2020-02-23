import React from "react";
import Title from "../utils/Title";
import { withStyles } from "@material-ui/styles";
import { Paper, Typography, TextField } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ProductRating from "./ProductRating";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      price: "",
      rating: 0
    };
  }

  componentWillReceiveProps(props, state) {
    const { selectedProduct = {} } = props;
    this.setState({
      ...selectedProduct
    });
  }

  handleProductEdit = label => event => {
    const value = event.target.value;
    if (label === "price" && isNaN(Number(value))) {
      return;
    }
    this.setState({
      [label]: label == "price" ? Number(value) : value
    });
  };

  handleSave = () => {
    const { id, ...rest } = this.state;
    /**
     * Here i didn't get why you are asking for entire data
     * if you want the edited data you can use this commented code
     */
    // const payload = ["name", "price", "rating"].reduce((prev, curr) => {
    //   if (this.state[curr] !== selectedProduct[curr]) {
    //     return { ...prev, [curr]: this.state[curr] };
    //   }
    //   return prev;
    // }, {});
    this.props.handleProductEdit(rest);
  };

  render() {
    const { classes } = this.props;
    const { name, id, price, rating } = this.state;

    return (
      <>
        <Paper
          className={classes.paper}
          style={{
            marginTop: 30
          }}
        >
          <Title
            label="Product Details"
            additionalLabel={this.props.selectedProduct.name}
          />
          <div style={{ margin: 30 }}>
            <div>
              <Typography style={{ fontWeight: "bold" }}>Name</Typography>
              <TextField
                id="outlined"
                variant="outlined"
                style={{ width: "100%", marginTop: 5 }}
                value={name}
                onChange={this.handleProductEdit("name")}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Typography style={{ fontWeight: "bold" }}>Price</Typography>
              <TextField
                variant="outlined"
                id="input-with-textfield"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography style={{ fontWeight: "bold" }}>$</Typography>
                    </InputAdornment>
                  )
                }}
                style={{ width: "100%" }}
                value={price}
                onChange={this.handleProductEdit("price")}
              />
            </div>
            <ProductRating
              rating={rating}
              handleChange={this.handleProductEdit("rating")}
            />
          </div>
        </Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "lightgray",
            border: "1px solid gray",
            padding: 10
          }}
        >
          {this.state.id && (
            <>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#269c68",
                  color: "white"
                }}
                onClick={() => this.handleSave()}
              >
                Save
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#ed553b",
                  color: "white",
                  marginLeft: 5
                }}
                onClick={() => this.props.handleProductDelete()}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </>
    );
  }
}

const styles = {
  paper: {
    height: "100vh",
    backgroundColor: "white",
    border: "1px solid #3f51b5",
    borderBottom: "none",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  }
};

export default withStyles(styles)(ProductList);
