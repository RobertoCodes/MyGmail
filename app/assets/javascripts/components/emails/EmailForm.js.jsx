window.EmailForm = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return ({ recipient_email: "", subject: "", body: "" });
  },

  handleToChange: function (e) {
    this.setState({recipient_email: e.currentTarget.value});
  },

  handleSubjectChange: function (e) {
    this.setState({subject: e.currentTarget.value});
  },

  handleBodyChange: function (e) {
    this.setState({body: e.currentTarget.value});
  },

  createEmail: function (e) {
    e.preventDefault();
    var email = {};
    Object.keys(this.state).forEach(function (key) {
      email[key] = this.state[key];
    }.bind(this));
    ApiUtil.createEmail(email, function () {
      this.history.pushState(null, "/", {});
    }.bind(this));
    this.setState({ recipient_email: "", subject: "", body: "" });
  },




  render: function () {
    return (
      <div className="email-form">
      <label className="new-message-label">New Message</label><br/>
        <form onSubmit={this.createEmail}>
            <input className="email-form-to-input" type="email" value={this.state.recipient_email}
              onChange={this.handleToChange} placeholder="To"/>
          <br/>
            <input className="email-form-subject-input" type="text" value={this.state.subject}
              onChange={this.handleSubjectChange} placeholder="Subject"/>
          <br/>
            <input type="textarea" className="email-form-body-input"
              value={this.state.body} onChange={this.handleBodyChange}/>
          <br/>
            <button>Send</button>

        </form>
      </div>
    );


  }





});