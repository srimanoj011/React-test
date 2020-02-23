import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { logout } from "../../store/actions";

class ApplicationBar extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Product Manager</Typography>
            <Button
              color="inherit"
              onClick={() => this.props.logout(this.props.token)}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(
  ({ auth: { token } }) => ({ token }),
  { logout }
)(ApplicationBar);
