(function () {

    function debounce(func, wait = 100) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        };
    }

    function init() {
        var container = document.getElementsByClassName('punch-viewer-container')[0];
        if (!container) {
            return;
        }
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        var lastClick = new Date();

        function checkHotword(word) {
            console.log('checking word ' + word)
            if ((new Date - lastClick) > 1000 && word.endsWith('click')) {
                lastClick = new Date();
                container.click();
            }
        }
        const checkHotwordDebounced = debounce(checkHotword, 100);
        recognition.onresult = function (event) {
            const lastResult = event.results[event.results.length - 1];
            var interim_transcript = lastResult.isFinal ? '' : lastResult[0].transcript;

            console.log('interim: ' + interim_transcript)
            if (interim_transcript) {
                checkHotwordDebounced(interim_transcript)
            }
        };

        recognition.onstart = function () { console.log('onstart') }
        recognition.onerror = function (event) { console.log('onerror', event); }
        recognition.onend = function (event) { console.log('onend', event); recognition.start(); }
        recognition.lang = 'en-US';
        recognition.start();

    }

    init();
})()


