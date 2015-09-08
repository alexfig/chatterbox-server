var MessagesView = Backbone.View.extend({
  className: 'row chat-row',

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(function(message) {
      var messageView = new MessageView({model: message});
      this.$el.append(messageView.render());
    }, this);

    return this;
  }
});