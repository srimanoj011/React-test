import React from "react";
import Title from "../utils/Title";
import { Paper, Typography, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class ProductRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      rating: props.rating
    };
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.rating);
    return (
      <Paper
        className={classes.paper}
        style={{
          marginTop: 30
        }}
      >
        <Title label="Rating" />
        <div style={{ margin: 20 }}>
          <Select
            labelId="demo-simple-select"
            value={this.state.rating || 0}
            variant="outlined"
            style={{ width: "100%" }}
            onChange={eve => this.props.handleChange(eve)}
          >
            {new Array(11).fill(0).map((ele, index) => (
              <MenuItem value={index} key={index}>
                {index}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Paper>
    );
  }
}

const styles = {
  paper: {
    // height: "100vh",
    backgroundColor: "white",
    border: "1px solid #3f51b5"
  }
};

export default withStyles(styles)(ProductRating);
