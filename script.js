document.addEventListener('scroll', () => {
    renderDotsView();
    drawConnectingLine(); // Draw the line on scroll
});

function renderDotsView() {
    const containers = document.querySelectorAll('.dot-container, .section-container');
    containers.forEach(dotContainer => {
        const rect = dotContainer.getBoundingClientRect();
        if (rect.top >= -rect.height && rect.bottom <= window.innerHeight / 2) {
            dotContainer.classList.add('active');
        } else {
            dotContainer.classList.remove('active');
        }
    });
}

// Call the function to position the dots after the DOM is fully loaded
window.addEventListener('load', () => {
    renderDotsView();
    drawConnectingLine(); // Draw the line initially
});

function drawConnectingLine() {
    const flowContainer = document.querySelector('.flow-container');
    const lineSvg = document.getElementById('flow-line');
    const dots = document.querySelectorAll('.dot-container .dot');
    let path = '';

    dots.forEach((dot, index) => {
        const rect = dot.getBoundingClientRect();
        const dotCenterX = rect.right - rect.width / 2;
        const dotCenterY = rect.top + rect.height / 2 + window.scrollY;

        if (index === 0) {
            path += `M ${dotCenterX} ${dotCenterY}`;
        } else {
            path += ` L ${dotCenterX} ${dotCenterY}`;
        }
    });

    lineSvg.style.height = `${flowContainer.clientHeight}px`;
    lineSvg.innerHTML = `<path d="${path}" fill="none" stroke="#00bfff88" stroke-width="3" filter="drop-shadow(0 0 8px #00bfff)" />`;
}