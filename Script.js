document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Detener el env�o del formulario

    // Obtener los valores de los campos
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const responseMessage = document.getElementById('responseMessage');

    // Validar que los campos no est�n vac�os
    if (name === '' || email === '' || message === '') {
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Todos los campos son obligatorios.';
        return;
    }

    // Validar el formato del correo electr�nico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Por favor, ingrese un correo electr�nico v�lido.';
        return;
    }

    // Enviar los datos del formulario a trav�s de una solicitud HTTP POST
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://github.com/Dailyn17/Perfil.git', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Mostrar mensaje de confirmaci�n
                responseMessage.style.color = 'green';
                responseMessage.textContent = 'Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.';
                // Limpiar el formulario
                document.getElementById('contactForm').reset();
            } else {
                // Mostrar mensaje de error
                responseMessage.style.color = 'red';
                responseMessage.textContent = 'Hubo un error al enviar tu mensaje. Por favor, int�ntalo de nuevo m�s tarde.';
            }
        }
    };
    const data = JSON.stringify({ name: name, email: email, message: message });
    xhr.send(data);
});
