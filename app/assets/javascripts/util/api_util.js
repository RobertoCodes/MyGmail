window.ApiUtil = {
  fetchAllEmails: function () {
    $.ajax({
      url: "/api/emails",
      success: function (emails) {
        ApiActions.receiveAllEmails(emails);
      }
    });
  },

  fetchSingleEmail: function (id) {
    $.ajax({
      url: "/api/emails/" + id,
      success: function (email) {
        ApiActions.receiveOneEmail(email);
      }

    });
  },

  createEmail: function (email, callback) {
    $.ajax({
      url: "/api/emails",
      method: "POST",
      data: {email: email},
      success: function (email) {
        ApiActions.receiveOneEmail(email);
        callback && callback();
      }

    });
  }



};
