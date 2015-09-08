var Messages = Backbone.Collection.extend({
  model: Message,

  url: 'http://localhost:3000/classes/lobby',

  initialize: function() {
    this.currentUser = 'Garrett';
    this.currentRoom = 'lobby';
    this.loadMessages();
  },

  loadMessages: function() {
    this.fetch();
  },

  parse: function(response, options) {
    return response.results;
  },

  changeUser: function(username) {
    this.currentUser = username;
  },

  changeRoom: function(roomname) {
    this.url = 'http://localhost:3000/classes/' + roomname;
    this.currentRoom = roomname;
    this.reset();
    this.loadMessages();
  }

});