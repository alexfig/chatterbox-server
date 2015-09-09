var FormView = Backbone.View.extend({
  className: 'row input input-row',

  initialize: function() {
    this.render();
  },

  events: {
    'click #sendButton': 'handleSubmit' 
  },

  handleSubmit: function() {
    var self = this;
    var messageObj = {};
    messageObj.text = $("#message").val();
    messageObj.username = this.collection.currentUser;
    messageObj.roomname = this.collection.currentRoom;

    this.collection.create(messageObj);
    this.$('#message').val('');
  },

  render: function() {
    var $form = $('<input id="message" class="col s7 offset-s1 message-holder" type="text" placeholder="message"> \
            <a id="sendButton" class="col s2 waves-effect waves-light btn">Send</a>');

    this.$el.append($form);
  }
});