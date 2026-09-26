// Menu mobile: abre e fecha a navegação e mantém aria-expanded sincronizado.
const botaoMenu = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu-principal');

function definirMenuAberto(aberto) {
    menu.classList.toggle('ativo', aberto);
    botaoMenu.setAttribute('aria-expanded', String(aberto));
}

if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', () => {
        definirMenuAberto(!menu.classList.contains('ativo'));
    });

    // Esc fecha o menu e devolve o foco ao botão.
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && menu.classList.contains('ativo')) {
            definirMenuAberto(false);
            botaoMenu.focus();
        }
    });
}

// Toast: mensagem temporária anunciada por leitores de tela (role="status").
const toast = document.getElementById('toast');
let temporizadorToast;

function mostrarToast(mensagem) {
    if (!toast) {
        return;
    }
    clearTimeout(temporizadorToast);
    toast.textContent = mensagem;
    toast.classList.add('visivel');
    temporizadorToast = setTimeout(() => {
        toast.classList.remove('visivel');
        // Limpa o texto depois da animação de saída.
        temporizadorToast = setTimeout(() => {
            toast.textContent = '';
        }, 300);
    }, 4000);
}

document.querySelectorAll('[data-toast]').forEach((botao) => {
    botao.addEventListener('click', () => mostrarToast(botao.dataset.toast));
});

// Formulário: o evento submit só dispara quando as validações HTML5 passam.
const formulario = document.querySelector('.formulario');

if (formulario) {
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        formulario.reset();
        mostrarToast('Cadastro enviado com sucesso.');
    });
}
