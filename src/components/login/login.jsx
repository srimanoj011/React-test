import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import { signIn } from "../../store/actions";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: { value: "", isError: false },
      password: { value: "", isError: false },
      fields: [
        { fieldRef: "userNameRef", label: "Username", type: "username" },
        { fieldRef: "passwordRef", label: "Password", type: "password" }
      ]
    };
  }

  componentDidMount() {
    this.userNameRef.focus();
  }

  login = () => {
    const { username, password } = this.state;
    if (!username.isError && !password.isError) {
      this.props.signIn({
        username: username.value,
        password: password.value
      });
    }
  };

  handleChange = event => {
    const value = event.target.value.trim();
    this.setState({
      [event.target.name]: {
        value,
        isError: !value
      }
    });
  };

  handleKeyPress = event => {
    const type = event.target.name;
    if (event.key === "Enter") {
      if (type === "username") {
        this.passwordRef.focus();
      } else if (type === "password") {
        this.login();
      }
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.mainDiv}>
          <div className={classes.imageContainer}>
            <Avatar
              alt="Products login"
              src="/logo192.png"
              className={classes.logoStyle}
            />
          </div>
          <div className={classes.formStyle}>
            {this.state.fields.map((element, index) => (
              <Fragment key={index}>
                <TextField
                  style={{ marginTop: 30 }}
                  value={this.state[element.type].value}
                  label={element.label}
                  name={element.type}
                  type={element.type}
                  variant="outlined"
                  className={classes.textfieldStyle}
                  onChange={this.handleChange}
                  inputRef={ref => (this[element.fieldRef] = ref)}
                  onKeyPress={this.handleKeyPress}
                />
                {this.state[element.type].isError && (
                  <Typography className={classes.warningText}>
                    {`* ${element.label}  is Mandatory`}
                  </Typography>
                )}
              </Fragment>
            ))}
          </div>
          <Button
            style={{ marginTop: 30 }}
            disableRipple={true}
            className={classes.logInButton}
            onClick={() => {
              this.login();
            }}
            variant="contained"
            type="submit"
          >
            log in
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  formStyle: {
    display: "flex",
    flexDirection: "column"
  },
  textfieldStyle: {
    width: "80%",
    alignSelf: "center"
  },
  warningText: {
    marginLeft: 50,
    fontSize: 14,
    color: "red",
    marginTop: 5
  },
  textStyle: {
    alignSelf: "center",
    color: "gray",
    marginTop: 10
  },
  margin: {
    marginBottom: 20
  },
  logInButton: {
    marginTop: 20,
    borderRadius: 20,
    width: "40%",
    alignSelf: "center",
    color: "white",
    background: "linear-gradient(360deg, green 50%, lightgreen 90%)"
  },
  mainDiv: {
    boxShadow: "0px 0px 10px lightgray",
    marginTop: "10%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 50,
    marginLeft: "35%",
    marginRight: "35%",
    borderRadius: 20
  },
  logoStyle: {
    width: 120,
    height: 120
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20
  }
};

Login.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(
  connect(
    null,
    { signIn }
  )(Login)
);
