const removeButtons = document.querySelectorAll(".remove-button");

removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.closest('.word-row').remove();
    })
});