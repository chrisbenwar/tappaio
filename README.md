Tappa IO
=======

Capture key, mouse and touch events through a web page and use these events to control a device running a web socket server.

The application starts a Tornado web and socket server. The web server serves pages with html mouse and keyboard controls. These send data via web sockets to the the socket server which uses the PyUserInput library to control low level mouse and keyboard events.

Any device can then connect into the web server port to control input on the device running tappa io.

The mouse and keyboard can then be modified using javascript and css to test different keyboard and mouse designs.
