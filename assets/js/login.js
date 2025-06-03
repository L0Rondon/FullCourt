// Sistema de abas
document.querySelectorAll('[data-tab]').forEach(element => {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        const tabName = this.getAttribute('data-tab');

        // Remove classes ativas
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });

        // Ativa aba e formulário correspondente
        this.classList.add('active');
        document.getElementById(`${tabName}-form`).classList.add('active');
    });
});