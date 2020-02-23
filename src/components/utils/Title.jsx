import React from "react";
import { Typography } from "@material-ui/core";

export default class Title extends React.Component {
  render() {
    return (
      <div
        style={{
          padding: 10,
          backgroundColor: "#3f51b5",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Typography style={{ color: "white" }}>{this.props.label}</Typography>
        {this.props.additionalLabel && (
          <Typography style={{ color: "white" }}>
            {this.props.additionalLabel || ""}
          </Typography>
        )}
      </div>
    );
  }
}
