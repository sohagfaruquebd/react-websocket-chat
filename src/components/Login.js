import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
const axios = require("axios");
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  componentWillMount() {
    document.title = "Login";
  }

  login = async () => {
    const { data } = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}users/login`,
      data: this.state,
    });
    console.log(data.data._id);
    this.props.login({ token: data.data._id });
    this.props.history.push("/home");
    console.log(data);
  };
  registration = () => {
    this.props.history.push("/registration");
  };

  handleReset(e) {
    e.preventDefault();

    this.refs.form.resetFields();
  }

  bindEmail = (e) => {
    this.setState({ email: e.target.value });
    console.log(this.state);
  };

  bindPassword = (e) => {
    this.setState({ password: e.target.value });
    console.log(this.state);
  };

  render() {
    return (
      <Form>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
              onChange={(val) => this.bindEmail(val)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>
            Password
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
              onChange={(val) => this.bindPassword(val)}
            />
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button onClick={() => this.login()}>Login</Button>
            <Button onClick={() => this.registration()}>Registration</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: (token) => dispatch({ type: "Store", token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login
