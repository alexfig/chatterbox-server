var Messages = Backbone.Collection.extend({
  model: Message,

  url: 'localhost:3000',

  initialize: function() {
    this.username = 'Garrett';
  }

  loadMessages: function() {

    this.fetch();
  },

  parse: function(response, options) {
    return response.results;
  },

  changeUser: function(username) {
    this.username = username;
  }

});