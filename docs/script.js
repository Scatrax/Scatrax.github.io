document.addEventListener("DOMContentLoaded", function() {
    let clients = document.querySelectorAll(".client");
    let index = 0;
    const groupSize = 4;
    const interval = 1500; // Intervalo de cambio

    function toggleClients() {
        clients.forEach(client => client.style.display = 'none');
        for (let i = index; i < index + groupSize; i++) {
            if (clients[i]) {
                clients[i].style.display = 'block';
            }
        }
        index = (index + groupSize) % clients.length;
    }

    toggleClients();
    setInterval(toggleClients, interval);

    // Menu toggle for mobile view
    const menuToggle = document.querySelector("#mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });
});
