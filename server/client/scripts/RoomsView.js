var RoomsView = Backbone.View.extend({
  tagName: 'ul',

  className: 'side-nav fixed room-list',

  template: _.template('\
    <li class="room-logo"><a class="">Rooms</a></li> \
    <div class="create-room"> \
      <a class="waves-effect waves-teal btn modal-trigger create-room" href="#modal2">Create Room</a> \
    </div> \
    '
  ),

  initialize: function() {
    var self = this;
    this.roomList = {};
    this.listenTo(this.collection, 'add', function(){self.render();console.log('addcallback');});
    this.$el.html(this.template());
    this.$('.modal-trigger.create-room').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        ready: function() {
        }
        , // Callback for Modal open
        complete: function() {
          console.log('complete');
          self.collection.trigger('createRoom', $('#room-name').val());
        } // Callback for Modal close
      }
    );
    this.render();



  },

  render: function() {
    var self = this;
    //this.$el.children().detach();
    $('#room-name').val('');
    self.collection.map(function(room) {
      if(!(room.get('roomname') in self.roomList)) {
        self.roomList[room.get('roomname')] = true;
        self.$el.append(new RoomView({model: room}).render());
      }
    });

    return self.$el;
  },

});