var MessagesView = Backbone.View.extend({
  className: 'row chat-row',

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'reset', this.clearMessages);
    this.messages = {};
    this.render();
    var self = this;
    setTimeout(function() {
      self.$el[0].scrollTop = self.$el[0].scrollHeight;
    }, 200);
  },

  render: function() {
    var self = this;

    self.collection.forEach(function(message) {
      if (!(message.cid in self.messages)) {
        self.messages[message.cid] = true;
        self.$el.append(new MessageView({model: message}).render());
      }
    });
    this.$el[0].scrollTop = this.$el[0].scrollHeight;

    return self;
  },

  clearMessages: function() {
    this.messages = {};
    this.$el.empty();
  },

});