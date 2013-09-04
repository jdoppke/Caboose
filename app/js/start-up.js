(function() {

    var EVENT_SRC = 'http://radar:8888/node';
    var modal = $('.begin-modal');
    var overlay = $('.overlay');
    var startButton = $('#start');
    var ES;

    startButton.addEventListener('click', startLog, false);

    function startLog(e) {
        overlay.remove();
        modal.remove();

        Caboose.init();
        makeConnection();
    }

    function makeConnection() {
        ES = new EventSource(EVENT_SRC);
        ES.addEventListener('open', connectionSuccess, false);
        ES.addEventListener('message', Caboose.updateData, false);
        ES.addEventListener('error', connectionError, false);
        ES.addEventListener('ping', function(e) {
            console.log('ping');
        }, false);
    }

    function connectionSuccess() {
        console.log('Connected');   
    }

    function connectionError(e) {
        ES.close();
        console.log('Check event source server or resource.');
        console.log(e);   
    }

})();