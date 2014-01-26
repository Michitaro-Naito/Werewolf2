$(function () {

    function Message(name, body) {
        var s = this;
        s.name = name;
        s.body = body;
    }

    function AppModel() {
        var s = this;

        s.Hub = ko.observable();
        s.Body = ko.observable('');
        s.Messages = ko.observableArray([]);

        s.Connect = function (host, roomId, jwt) {
            // Gets Script
            $.getScript(host + 'signalr/hubs', function (script, textStatus, jqXHR) {
                // Gets Hub
                $.connection.hub.url = host + 'signalr';
                var hub = $.connection.gameHub;
                s.Hub(hub);

                // Connection Callbacks
                hub.connection.stateChanged(function (state) {
                    console.info(state);
                });

                // Callbacks
                hub.client.addMessage = s.GotMessage;

                // Connects
                $.connection.hub.start();
            });
        }

        s.GotMessage = function (name, body) {
            s.Messages.push(new Message(name, body));
        }

        s.Send = function () {
            var hub = s.Hub();
            if (typeof hub == 'undefined')
                return;
            var body = s.Body();
            if (body.length == 0)
                return;
            hub.server.send('The name', body);
            s.Body('');
        }

    }

    var model = new AppModel();
    ko.applyBindings(model, document.getElementById('game'));
    model.Connect('http://localhost:8080/', 123, 'abc');

});