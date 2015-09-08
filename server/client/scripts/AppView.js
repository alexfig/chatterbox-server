var AppView = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    this.rooms = new RoomView(collection: this.model.get('rooms'));
    this.card = new CardView(collection: this.model.get('messages'));
    this.render();
  },

  render: function() {
    this.$el.append([
      this.rooms.$el,
      this.card.$el
    ]);

    return this;
  }
});