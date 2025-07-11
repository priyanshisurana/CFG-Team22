// Check if browser supports Web Speech API
if (!('webkitSpeechRecognition' in window)) {
  alert('Speech recognition not supported. Try using Chrome browser.');
} else {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let finalTranscript = '';

  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const interimSpan = document.getElementById('interim');
  const finalSpan = document.getElementById('final');
  const languageSelect = document.getElementById('language-select');

  startBtn.addEventListener('click', () => {
    finalTranscript = '';
    recognition.lang = languageSelect.value;
    recognition.start();
  });

  stopBtn.addEventListener('click', () => {
    recognition.stop();
    startBtn.innerText = '🎤 Start Listening';
  });

  languageSelect.addEventListener('change', () => {
    recognition.lang = languageSelect.value;
  });

  recognition.onstart = () => {
    startBtn.innerText = '🎙️ Listening...';
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  recognition.onend = () => {
    startBtn.innerText = '🎤 Start Listening';
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    finalSpan.innerHTML = linebreak(finalTranscript);
    interimSpan.innerHTML = linebreak(interimTranscript);
  };

  // Utilities to handle line breaks
  function linebreak(text) {
    return text.replace(/\n\n/g, '<p></p>').replace(/\n/g, '<br>');
  }
}
