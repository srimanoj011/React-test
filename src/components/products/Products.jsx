import React from "react";
import AppBar from "../utils/AppBar";
import Paper from "@material-ui/core/Paper";
import ProductList from "./ProductsList";
import ProductDetail from "./ProductDetail";
import ProductStock from "./ProductStock";
import { withStyles, Typography, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import {
  getProducts,
  createNewProduct,
  editProduct,
  deleteProduct,
  selectProduct
} from "../../store/actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProduct: {},
      open: false
    };
  }

  async componentDidMount() {
    const products = await this.props.getProducts(this.props.token);
    this.setState({
      products,
      selectedProduct: products[0] || {}
    });
  }

  static getDerivedStateFromProps(props, state) {
    return {
      products: props.products
    };
  }

  handleProductSelect = async productId => {
    if (this.state.selectedProduct.id != productId) {
      const selectedProduct = await this.props.selectProduct(
        this.props.token,
        productId
      );
      this.setState({
        selectedProduct
      });
    }
  };

  handleNewProduct = async productData => {
    const newProduct = await this.props.createNewProduct(
      this.props.token,
      productData
    );
    this.setState({
      open: false,
      selectedProduct: newProduct
    });
  };

  handleProductEdit = async payload => {
    const {
      selectedProduct: { id }
    } = this.state;
    const editedProduct = await this.props.editProduct(
      this.props.token,
      id,
      payload
    );
    this.setState({
      selectedProduct: editedProduct
    });
  };

  handleProductDelete = async () => {
    const {
      selectedProduct: { id }
    } = this.state;
    await this.props.deleteProduct(this.props.token, id);
    this.setState({
      selectedProduct: this.props.products[0]
        ? this.props.products[0]
        : { id: null, name: "", price: "", rating: 0 }
    });
  };

  render() {
    const { classes } = this.props;
    const {
      selectedProduct: { name, id }
    } = this.state;
    return (
      <>
        <AppBar />
        <div className={classes.container}>
          <ProductList
            products={this.state.products}
            handleProductSelect={product => this.handleProductSelect(product)}
            id={id}
          />
          <div className={classes.detailContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 20
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#3f51b5",
                  color: "white"
                }}
                onClick={() => this.setState({ open: true })}
              >
                Add
              </Button>
            </div>
            <ProductStock />
            <ProductDetail
              selectedProduct={this.state.selectedProduct}
              handleProductEdit={product => this.handleProductEdit(product)}
              handleProductDelete={() => this.handleProductDelete()}
            />
          </div>
        </div>
        <DialogBox
          open={this.state.open}
          handleModelclose={() => this.setState({ open: false })}
          handleNewProduct={productData => this.handleNewProduct(productData)}
        />
      </>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh"
  },
  detailContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: 30,
    height: "100vh"
  }
};

export default withStyles(styles)(
  connect(
    ({ product: { products }, auth: { token } }) => ({ products, token }),
    { getProducts, createNewProduct, editProduct, deleteProduct, selectProduct }
  )(Products)
);

class DialogBox extends React.Component {
  state = {
    name: "",
    price: "",
    rating: 0
  };

  handleChange = label => event => {
    const value = event.target.value;
    if (label === "price" && isNaN(Number(value))) {
      return;
    }
    this.setState({
      [label]: event.target.value
    });
  };

  handleClose = () => () => {
    this.setState({
      name: "",
      price: "",
      rating: 0
    });
    this.props.handleModelclose();
  };

  handleSave = () => {
    try {
      const { name, price, rating } = this.state;
      if (!name) {
        throw new Error("Need Product Name");
      }
      this.setState({ name: "", price: "", rating: 0 });
      this.props.handleNewProduct(this.state);
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { open } = this.props;
    const { name, price, rating } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Product"}</DialogTitle>
        <DialogContent>
          <div style={{ margin: 30 }}>
            <div>
              <Typography style={{ fontWeight: "bold" }}>Name</Typography>
              <TextField
                id="outlined"
                variant="outlined"
                style={{ width: "100%", marginTop: 5 }}
                value={name}
                onChange={this.handleChange("name")}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Typography style={{ fontWeight: "bold" }}>Price</Typography>
              <TextField
                name={"price"}
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
                onChange={this.handleChange("price")}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Typography style={{ fontWeight: "bold" }}>Rating</Typography>
              <Select
                name={"rating"}
                labelId="demo-simple-select"
                value={rating}
                variant="outlined"
                style={{ width: "100%" }}
                onChange={this.handleChange("rating")}
              >
                {new Array(11).fill(0).map((ele, index) => (
                  <MenuItem value={index} key={index}>
                    {index}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.handleSave()} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
