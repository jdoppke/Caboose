(function() {

    var EVENT_SRC = "";

    // Default sources are just for dev/testing.
    Caboose.config.url = "http://radar:8888/tracks/Tracks";
    //var CONFIG.url = "http://192.168.1.84:8888/node";

    var modal = $(".begin-modal");
    var overlay = $(".overlay");
    var startButton = $("#start");
    var ES;

    var errorStr = "Error connecting, check event source server or resource.";

    setTimeout(function() { Modal.show(".begin-modal")}, 500);
    startButton.addEventListener("click", startLog, false);

    function startLog(e) {

        Caboose.config.timeSync = $("input[name=time-sync]:checked").value;

        // Default sources are just for dev/testing.
        EVENT_SRC = $("input[name='track-path']").value || Caboose.config.url;
        EVENT_SRC += '?timeSync=' + Caboose.config.timeSync;

        Modal.hide(".begin-modal");
        makeConnection();
    }

    function makeConnection() {
        ES = new EventSource(EVENT_SRC);
        ES.addEventListener("open", connectionSuccess, false);
        ES.addEventListener("message", Caboose.updateData, false);
        ES.addEventListener("error", connectionError, false);
        ES.addEventListener("ping", pong, false);
    }

    function connectionSuccess() {
        Caboose.go();
        StatusBar.setSuccess("Successfully connected.");
    }

    function connectionError(e) {
        Caboose.stop();
        ES.close();
        StatusBar.setError(errorStr);
        console.log(errorStr);
    }

    function pong(e) {
        // TODO: Use timestamp returned to find offset, incorporate into
        //       the UI.
        //console.log(e);
    }

})();