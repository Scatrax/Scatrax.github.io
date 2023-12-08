document.addEventListener('DOMContentLoaded', function () {
    const pages = document.querySelectorAll('.page');

    window.addEventListener('scroll', function () {
        let currentScroll = window.scrollY;

        pages.forEach((page, index) => {
            const offset = page.offsetTop;

            if (currentScroll >= offset && currentScroll < offset + page.offsetHeight) {
                page.classList.add('visible');
            } else {
                page.classList.remove('visible');
            }
        });
    });
});
