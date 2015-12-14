
window.ConversationsIndex = React.createClass({
  getInitialState: function () {

    return { conversations: ConversationStore.all()};
  },

  _onChange: function () {
    this.setState({ conversations: ConversationStore.all()});
  },

  componentDidMount: function () {
    var category;
    category = this.props.location.pathname.split("/")[1];
    if (category === "") {
      category = "inbox"
    }
    ConversationStore.addConversationsIndexChangeListener(this._onChange);
    ConversationStore.addConversationDetailChangeListener(this._onChange);
    var queryParams = this.props.location.query;
    ApiUtil.fetchAllConversations(category, queryParams.page || 1);
  },

  componentWillReceiveProps: function (newProps) {
    debugger;
    var queryParams = newProps.location.query;
    ApiUtil.fetchAllConversations(newProps.params.category, queryParams.page || 1);
  },

  componentWillUnmount: function () {
    ConversationStore.removeConversationsIndexChangeListener(this._onChange);
    ConversationStore.removeConversationDetailChangeListener(this._onChange);
  },

  render: function () {
    var category = "";
    if (this.props.params) {
      category = this.props.params.category;
    }

    return(
      <div className="emails-index">
        <ul>
          {this.state.conversations.map(function (conversation) {
            var readClass = "";
            if (conversation.read) {
              readClass = "read";
            }
            return <div className={"inbox-row " + readClass}> <ConversationsIndexItem key={conversation.id}
              conversation={conversation} category= {category}/></div>;
          }.bind(this))}
        </ul>
        {this.props.children}
      </div>
    );
  }

});
