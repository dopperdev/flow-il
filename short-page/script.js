window.addEventListener('load', () => {
    const ctaButtons = document.querySelectorAll('.cta');
    const registerForm = document.querySelector('.register-form');

    ctaButtons.forEach(ctaButton => {
        ctaButton.addEventListener('click', () => {
            window.scrollTo({
                top: registerForm.offsetTop,
                behavior:'smooth'
            })
        });
    });

    const imagineContent = document.querySelector('.imagine-content');
    const imagineParagraphs = imagineContent.querySelectorAll('p');

    imagineParagraphs.forEach((paragraph, i) => {
        paragraph.style.animationDelay = `${i * 0.15}s`;
        paragraph.style.webkitAnimationDelay = `${i * 0.15}s`;
    });

    window.addEventListener('scroll', () => {
        const waveContainer = document.querySelector('.wave-container');
        const waveSvg = waveContainer.querySelector('svg');

        if (waveContainer.offsetTop < window.scrollY + window.innerHeight)
            waveSvg.classList.add('active');
        else
            waveSvg.classList.remove('active');
    });
});