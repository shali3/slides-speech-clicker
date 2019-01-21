(function () {

    function init() {
        var container = document.getElementsByClassName('punch-viewer-container')[0];
        if (!container) {
            return;
        }
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        var final_transcript = '';

        recognition.onresult = function (event) {
            var interim_transcript = '';

            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            console.log('final: ' + final_transcript)
            console.log('interim: ' + interim_transcript)
            if(interim_transcript.indexOf('next')!=-1){
                container.click();
            }
        };
        recognition.lang = 'en-US';
        recognition.start();

    }

    init();
})()


