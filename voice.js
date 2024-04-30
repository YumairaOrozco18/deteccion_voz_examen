document.addEventListener('DOMContentLoaded', function () {
    const startListeningBtn = document.getElementById('start-listening-btn');
    const resultText = document.getElementById('result-text');

    startListeningBtn.addEventListener('click', startListening);

    function startListening() {
        // Aquí puedes agregar la lógica para iniciar la escucha por voz
        // Puedes utilizar APIs como SpeechRecognition para esto
        // Por simplicidad, aquí se muestra un mensaje estático
        resultText.textContent = 'Escuchando... (Mensaje de prueba)';
    }
});
