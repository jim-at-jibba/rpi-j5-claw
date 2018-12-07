const server = require('http').createServer()
const io = require('socket.io')(server)
var five = require("johnny-five");
var Raspi = require('raspi-io');
var board = new five.Board({
  repl: false,
  io: new Raspi()
});


board.on("ready", function() {
    console.log("Ready!");
    // Set up jfive
    var servo = new five.Servo({
      pin: "P1-12",
      center: true
    });

    if(this.repl) {
      this.repl.inject({
        on: function() {
          console.log("REPL :: on")
          servo.sweep();
        },
        off: function() {
          console.log("REPL :: off")
        },
      })
    }

  // Set up sockets
  io.on('connection', function(client) {
    console.log("SOCKET CONNECTION ESTTABLISHED")
    client.once('servo', function() {
      console.log("SERVO event received");
      servo.sweep();
    })
  });
})

server.listen(3000, function (err) {
  if (err) throw err
  console.log('listening on port 3000')
})



