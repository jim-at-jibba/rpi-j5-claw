var five = require("johnny-five");
var Raspi = require('raspi-io');
var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  console.log("Ready!");

  var servo = new five.Servo({
    pin: "P1-12",
    center: true
  });

  this.repl.inject({
    on: function() {
      console.log("REPL :: on")
      servo.sweep();
    },
    off: function() {
      console.log("REPL :: off")
    },
    })
});
