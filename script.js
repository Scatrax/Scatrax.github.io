document.addEventListener("DOMContentLoaded", function() {
    var clients = document.querySelectorAll(".client");
    var index = 0;
    var groupSize = 4;
    var interval = 5000; // Cambia esto para ajustar el intervalo de cambio

    function toggleClients() {
        clients.forEach(function(client) {
            client.classList.remove("active");
        });
        for (var i = index; i < index + groupSize; i++) {
            if (clients[i]) {
                clients[i].classList.add("active");
            }
        }
        index += groupSize;
        if (index >= clients.length) {
            index = 0;
        }
    }

    toggleClients();
    setInterval(toggleClients, interval);
});
