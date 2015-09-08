var CardView = Backbone.View.extend({
  className: 'card chat-window',

  initialize: function() {
    this.user = new UserView(collection: this.collection);
    this.messages = new MessagesView(collection: this.collection);
    this.form = new FormView(collection: this.collection);
    this.render();
  },

  render: function() {
    this.$el.append([
      this.user.$el,
      this.messages.$el,
      this.form.$el
    ]);

    return this;
  }
});