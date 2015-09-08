var FormView = Backbone.View.extend({
  className: 'row input input-row',

  initialize: function() {
    this.render();
  },

  events: {
    'click #sendButton': 'handleSubmit' 
  },

  handleSubmit: function() {
    var messageObj = {};
    messageObj.text = $("#message").val();
    messageObj.username = currentUser;
    messageObj.roomname = currentRoom;
    var url = 'http://127.0.0.1:3000/classes/' + currentRoom
    this.collection.create(messageObj);
    this.$('#message').val('');
  },

  render: function() {
    var $form = $('<input id="message" class="col s7 offset-s1 message-holder" type="text" placeholder="message"> \
            <a id="sendButton" class="col s2 waves-effect waves-light btn">Send</a>');

    this.$el.append($form);
  }
});