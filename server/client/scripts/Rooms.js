var Rooms = Backbone.Collection.extend({
  model: Room,

  initialize: function() {
    this.add({roomname: 'lobby'});
    var self = this;
    this.listenTo(this, 'createRoom', this.createRoom);
    this.listenTo(this, 'changeRoom', this.changeRoom);
    this.currentRoom = 'lobby';
  },

  createRoom: function(roomname) {
    console.log(this);
    console.log(roomname);
    debugger;
    this.add({roomname: roomname});
    this.changeRoom(roomname);
  },

  changeRoom: function(roomname) {
    console.log('changing room in collection');
    this.currentRoom = roomname;
    this.trigger('updateRoom', this.currentRoom);
  }
});