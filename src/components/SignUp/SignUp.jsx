import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { IconButton, InputAdornment, Tab, Tabs } from "@material-ui/core";
import "./signup.scss";
import _ from "lodash";
import { validateEmail } from "../../utils/utils";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PasswordStrengthBar from "react-password-strength-bar/dist";
import { MIN_PASSWORD_LENGTH } from "../../utils/constants";
import { Link as RouterLink } from 'react-router-dom';

// code taken from https://material-ui.com/getting-started/templates/
const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            lName: "",
            password: "",
            userType: "CUSTOMER",
            fName: " ",
            passwordError: false,
            passwordHelper: "",
            emailError: false,
            emailHelper: "",
            showPassword: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.areFieldsFilled = this.areFieldsFilled.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    }

    handleChange(event) {
        const {
            target: { name, value },
        } = event;
        this.setState({ [name]: value });
    }

    handleTabChange(event, value) {
        this.setState({ userType: value }, () => {
            console.log(this.state);
        });
    }

    handleClickShowPassword() {
        const isPasswordShown = this.state.showPassword;
        this.setState({ showPassword: !isPasswordShown });
    }

    areFieldsFilled() {
        return _.some(
            _.omit(
                this.state,
                "passwordHelper",
                "passwordError",
                "emailError",
                "emailHelper",
                "showPassword"
            ),
            _.isEmpty
        );
    }

    areFieldsValid() {
        let invalid = false;
        // validate email
        if (!validateEmail(this.state.email)) {
            this.setState({
                emailError: true,
                emailHelper: "Pleas enter a valid email",
            });
            invalid = true;
        }
        // validate password
        if (!this.isValidPassword()) {
            invalid = true;
        }
        // if any fields are invalid return
        return invalid;
    }

    submitSignUp() {
        if (this.areFieldsValid()) {
            // do something
        }
    }

    isValidPassword() {
        const currPassword = this.state.password;
        if (
            currPassword.length < MIN_PASSWORD_LENGTH ||
            currPassword.search(/[a-z]/i) < 0 ||
            currPassword.search(/[0-9]/) < 0
        ) {
            this.setState({
                passwordHelper:
                    "Your password must be at least " +
                    MIN_PASSWORD_LENGTH +
                    " characters with at least one letter and one digit",
                passwordError: true,
            });
            return false;
        }
        return true;
    }

    showPasswordIcon() {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    edge="end"
                >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Add />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={this.handleChange}
                                    autoComplete="fname"
                                    name="fName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Last Name"
                                    name="lName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    helperText={this.state.emailHelper}
                                    error={this.state.emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={
                                        this.state.showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    autoComplete="current-password"
                                    helperText={this.state.passwordHelper}
                                    error={this.state.passwordError}
                                    InputProps={{
                                        endAdornment: this.showPasswordIcon(),
                                    }}
                                />
                                <PasswordStrengthBar
                                    password={this.state.password}
                                    minLength={MIN_PASSWORD_LENGTH}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Tabs
                                    value={this.state.userType}
                                    onChange={this.handleTabChange}
                                    centered
                                >
                                    <Tab label="Customer" value={"CUSTOMER"} />
                                    <Tab label="Owner" value={"OWNER"} />
                                </Tabs>
                            </Grid>
                        </Grid>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={this.areFieldsFilled()}
                            onClick={this.submitSignUp}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(SignUp);