var AppView = Backbone.View.extend({
  initialize: function(params) {
    this.messages = params.messages;
    this.rooms = new RoomsView({collection: params.rooms});
    this.card = new CardView({collection: params.messages});
    this.listenTo(params.rooms, 'updateRoom', this.changeRoom);
    this.render();
  },

  changeRoom: function(roomname) {
   this.messages.changeRoom(roomname);
  },

  render: function() {
    this.$el.append([
      this.rooms.$el,
      this.card.$el
    ]);

    return this;
  },

});