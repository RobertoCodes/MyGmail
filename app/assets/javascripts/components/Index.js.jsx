window.Index = React.createClass({

        // <header>
        //   <nav>
        //     <Search/>
        //   </nav>
        // </header>

  render: function () {
    return(
      <div>
        <nav>
          <Search className="search"/>
        </nav>
        <div className="main-container group">
          <div className="sidebar">
            <SideBar/>
          <p/>
          <p/>
          Contacts:
          <div className="contacts">
            <ContactsIndex/>
          </div>
          </div>
          <div className="email-index">
            {this.props.children}
          </div>
         </div>
      </div>
    );
  }
});


//also would like to add the "Side Bar" component here!
