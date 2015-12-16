
window.ConversationsIndex = React.createClass({
  getInitialState: function () {

    return { conversations: ConversationStore.all()};
  },

  _onChange: function () {
    this.setState({ conversations: ConversationStore.all()});
  },

  componentDidMount: function () {
    ConversationStore.addConversationsIndexChangeListener(this._onChange);
    ConversationStore.addConversationDetailChangeListener(this._onChange);

    var category = this.fetchConversations();

    if (category === "inbox") {
      intervalId  = setInterval(this.fetchConversations, 5000);
      this.setState({intervalId: intervalId});
    }
  },

  fetchConversations: function () {
    var category;
    category = this.props.location.pathname.split("/")[1];
    if (category === "") {
      category = "inbox"
    }
    var queryParams = this.props.location.query;
    ApiUtil.fetchAllConversations(category, queryParams.page || 1);
    return category;
  },

  componentWillReceiveProps: function (newProps) {
    var queryParams = newProps.location.query;
    ApiUtil.fetchAllConversations(newProps.params.category, queryParams.page || 1);
    if (newProps.params.category === "inbox" && this.state.intervalId == false) {
      intervalId  = setInterval(this.fetchConversations, 5000);
      this.setState({intervalId: intervalId});
    } else if (this.state.intervalId != false) {
      clearInterval(this.state.intervalId);
      this.setState({intervalId: 0});
    }
  },

  componentWillUnmount: function () {

    ConversationStore.removeConversationsIndexChangeListener(this._onChange);
    ConversationStore.removeConversationDetailChangeListener(this._onChange);
    clearInterval(this.state.intervalId);
    this.setState({intervalId: 0});

  },

  render: function () {
    var category = "";
    var pageStr = "";
    if (this.props.params) {
      category = this.props.params.category;
    }

    if (this.state.conversations.length > 0) {
      var startNum = (this.state.conversations[0].page -1) * 3 + 1
      var endNum = startNum + this.state.conversations.length - 1

      pageStr = <span className="page-string"> {startNum + "-" + endNum + " of "}
        {this.state.conversations[0].total_count}</span>;
    }

    return(
      <div className="emails-index">
        {pageStr}
        <ul>
          {this.state.conversations.map(function (conversation) {
            var readClass = "";
            if (conversation.read) {
              readClass = "read";
            }
            return <div key={conversation.id} className={"inbox-row " + readClass}>
              <ConversationsIndexItem conversation={conversation} category= {category}/></div>;
          }.bind(this))}
        </ul>
        {this.props.children}
      </div>
    );
  }

});
