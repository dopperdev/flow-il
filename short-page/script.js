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
});