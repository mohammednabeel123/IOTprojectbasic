const express = require("express");
const { SerialPort, ReadlineParser } = require("serialport");

const app = express();
const port = 3000;

// Configure Serial Port
const serialPort = new SerialPort({
  path: "COM3", // Replace with your Arduino's serial port
  baudRate: 9600,
});

const parser = new ReadlineParser();
serialPort.pipe(parser);

// Endpoint to send commands to Arduino
app.get("/:command", (req, res) => {
  const command = req.params.command.toUpperCase();
  if (command === "ON" || command === "OFF") {
    serialPort.write(command + "\n", (err) => {
      if (err) {
        return res.status(500).send("Failed to send command to Arduino");
      }
      console.log(`Command ${command} sent to Arduino`);
      res.send(`Command ${command} sent to Arduino`);
    });
  } else {
    res.status(400).send("Invalid command");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
