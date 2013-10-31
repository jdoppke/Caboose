(function() {

    var EVENT_SRC = '';
    // Default sources are just for dev/testing.
    var DEFAULT_SRC = 'http://radar:8888/node';
    var DEFAULT_SRC = 'http://192.168.1.84:8888/node';
    var modal = $('.begin-modal');
    var overlay = $('.overlay');
    var startButton = $('#start');
    var ES;

    var errorStr = "Error connecting, check event source server or resource.";

    startButton.addEventListener('click', startLog, false);

    function startLog(e) {
        // Default sources are just for dev/testing.
        EVENT_SRC = $('input[name="track-path"]').value || DEFAULT_SRC;
        console.log(EVENT_SRC);
        overlay.remove();
        modal.remove();
        makeConnection();
    }

    function makeConnection() {
        ES = new EventSource(EVENT_SRC);
        ES.addEventListener('open', connectionSuccess, false);
        ES.addEventListener('message', Caboose.updateData, false);
        ES.addEventListener('error', connectionError, false);
        ES.addEventListener('ping', function() {}, false);
    }

    function connectionSuccess() {
        Caboose.go();
        StatusBar.setSuccess("Successfully connected.");
    }

    function connectionError(e) {
        ES.close();
        StatusBar.setError(errorStr);
        console.log(errorStr);
    }

})();