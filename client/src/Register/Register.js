import React, {Component} from 'react';
import FormError from '../FormError/FormError';
import  firebase from '../Firebase';
import * as firebaseui from "firebaseui";
class Register extends Component {
constructor(props) {
    super(props);
    this.state = {
        displayName: '',
        email: '',
        passOne: '',
        passTwo: '',
        errorMessage: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount() {
  const uiConfig = {
    signInSuccessUrl: "https://netflix-clone-ankur.herokuapp.com/", //This URL is used to return to that page when we got success response for phone authentication.
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    tosUrl: "https://netflix-clone-ankur.herokuapp.com/"
  };
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", uiConfig);
}

handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({[itemName]: itemValue}, ()=> {
        if (this.state.passOne !== this.state.passTwo) {
            this.setState({errorMessage: 'Passwords do not match'});
        } else {
            this.setState({errorMessage: null});
        }
    });
}

  handleSubmit(e) {
    let registrationInfo = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.passOne
    }
    e.preventDefault();

    firebase
      .auth().createUserWithEmailAndPassword(
      registrationInfo.email,
      registrationInfo.password
    ).then(()=> {
      this.props.registerUser(registrationInfo.displayName);
    })
    .catch(error => {
      if (error.message !== null) {
        this.setState({ errorMessage: error.message });
      } else {
        this.setState({ errorMessage: null });
      }
    });
  }

    render() {
        return (
          <div className="container">

            <form className="col s10" onSubmit={this.handleSubmit}>
              <div className="row">    
                <h3>Register</h3>
                <div className="form-row">
                {this.state.errorMessage !== null ? (
                  <FormError theMessage={this.state.errorMessage}/>
                ): null}
                  <section className="input-field col s6">
                    <label
                      htmlFor="displayName"
                    >
                          Display Name
                        </label>
                    <input
                      className="validate"
                      type="text"
                      id="displayName"
                      placeholder="Display Name"
                      name="displayName"
                      required
                      value={this.state.displayName}
                      onChange={this.handleChange}
                    />
                  </section>
                </div>
                <section className="input-field col s6">
                  <label
                    
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="validate"
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    required
                    name="email"
                    value={this.state.email}
                      onChange={this.handleChange}
                  />
                </section>
                <div>
                  <section className="input-field col s12">
                    <input
                      className="validate"
                      type="password"
                      name="passOne"
                      placeholder="Password"
                      value={this.state.passOne}
                      onChange={this.handleChange}
                    />
                  </section>
                  <section className="input-field col s12">
                    <input
                      className="validate"
                      type="password"
                      required
                      name="passTwo"
                      placeholder="Repeat Password"
                      value={this.state.passTwo}
                      onChange={this.handleChange}
                    />
                  </section>
                </div>
                <div id="firebaseui-auth-container"></div>
                <div className="form-group text-right mb-0">
                  <button className="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
              </div>     
            </form>
          </div>

        )
    }
}

export default Register;