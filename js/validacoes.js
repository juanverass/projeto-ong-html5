// Validação do formulário de cadastro, feedback visual, máscaras (IMask) e toast.

import { templateErrosFormulario } from './templates.js';

const CAMPOS_CADASTRO = [
    'nome', 'email', 'nascimento', 'cpf', 'telefone',
    'cep', 'endereco', 'cidade', 'estado', 'participacao'
];

const MASCARAS = {
    cpf: '000.000.000-00',
    telefone: '(00) 00000-0000',
    cep: '00000-000'
};

const mensagensObrigatorio = {
    nome: 'Informe seu nome completo.',
    email: 'Informe seu e-mail.',
    nascimento: 'Informe sua data de nascimento.',
    cpf: 'Informe seu CPF.',
    telefone: 'Informe seu telefone com DDD.',
    cep: 'Informe seu CEP.',
    endereco: 'Informe seu endereço.',
    cidade: 'Informe sua cidade.',
    estado: 'Selecione o estado.',
    participacao: 'Escolha uma forma de participação.'
};

const mensagensFormato = {
    email: 'Informe um e-mail válido, como nome@exemplo.com.',
    nascimento: 'Informe uma data válida.',
    cpf: 'Use o formato 000.000.000-00.',
    telefone: 'Use o formato (00) 00000-0000.',
    cep: 'Use o formato 00000-000.'
};

// Regras que o HTML5 sozinho não cobre. Retornam a mensagem de erro ou ''.
const regrasComplementares = {
    nome: (valor) => (valor.trim().split(/\s+/).length < 2 ? 'Informe nome e sobrenome.' : ''),
    email: (valor) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor) ? '' : mensagensFormato.email),
    nascimento: (valor) => {
        const data = new Date(`${valor}T00:00:00`);
        if (Number.isNaN(data.getTime()) || data.getFullYear() < 1900) {
            return mensagensFormato.nascimento;
        }
        return data > new Date() ? 'A data de nascimento não pode estar no futuro.' : '';
    },
    cpf: (valor) => (/^(\d)\1{2}\.\1{3}\.\1{3}-\1{2}$/.test(valor) ? 'CPF inválido: os dígitos não podem ser todos iguais.' : ''),
    telefone: (valor) => (valor.startsWith('(0') ? 'Informe um DDD válido.' : ''),
    endereco: (valor) => (valor.trim().length < 5 ? 'Informe rua e número.' : ''),
    cidade: (valor) => (valor.trim().length < 2 ? 'Informe o nome da cidade.' : '')
};

const mascarasAtivas = new Map();
let temporizadorToast;

/* Máscaras ------------------------------------------------------------- */

/** Aplica as máscaras do IMask. Chamar apenas depois que o formulário estiver no DOM. */
export function iniciarMascaras(formulario) {
    destruirMascaras();

    if (typeof window.IMask !== 'function') {
        // Sem a biblioteca (CDN fora do ar), o atributo pattern continua validando o formato.
        return false;
    }

    Object.entries(MASCARAS).forEach(([id, mask]) => {
        const campo = formulario.querySelector(`#${id}`);
        if (campo) {
            mascarasAtivas.set(id, window.IMask(campo, { mask }));
        }
    });
    return true;
}

/** Remove as máscaras do formulário anterior (a SPA descarta o HTML ao trocar de página). */
export function destruirMascaras() {
    mascarasAtivas.forEach((mascara) => mascara.destroy());
    mascarasAtivas.clear();
}

/** Sincroniza as máscaras depois de alterar os valores por código (preenchimento ou reset). */
function sincronizarMascaras() {
    mascarasAtivas.forEach((mascara) => mascara.updateValue());
}

/* Validação ------------------------------------------------------------ */

/** Campo usado como referência para validação (no grupo de rádio, o primeiro botão). */
function campoPrincipal(formulario, nome) {
    return formulario.querySelector(`[name="${nome}"]`);
}

function rotuloDoCampo(campo) {
    if (campo.type === 'radio') {
        return campo.closest('fieldset').querySelector('legend').textContent;
    }
    return campo.labels[0].textContent;
}

function aplicarEstado(campo, mensagem) {
    const valido = !mensagem;
    const alvoVisual = campo.type === 'radio' ? campo.closest('.opcoes') : campo;

    alvoVisual.classList.toggle('campo-valido', valido);
    alvoVisual.classList.toggle('campo-invalido', !valido);

    campo.form.querySelectorAll(`[name="${campo.name}"]`).forEach((item) => {
        item.setAttribute('aria-invalid', String(!valido));
    });

    const areaErro = document.getElementById(`erro-${campo.name}`);
    if (areaErro) {
        areaErro.textContent = mensagem;
    }
}

/**
 * Valida um campo com as regras nativas (checkValidity) e as complementares,
 * atualiza as classes .campo-valido / .campo-invalido e a mensagem de erro.
 */
export function validarCampo(campoAlterado) {
    const campo = campoAlterado.type === 'radio'
        ? campoPrincipal(campoAlterado.form, campoAlterado.name)
        : campoAlterado;

    campo.setCustomValidity('');
    const { validity } = campo;
    let mensagem = '';

    if (validity.valueMissing) {
        mensagem = mensagensObrigatorio[campo.name] ?? 'Campo obrigatório.';
    } else if (validity.typeMismatch || validity.patternMismatch || validity.badInput || validity.tooLong) {
        mensagem = mensagensFormato[campo.name] ?? 'Valor em formato inválido.';
    } else if (regrasComplementares[campo.name]) {
        mensagem = regrasComplementares[campo.name](campo.value);
    }

    // A mensagem personalizada também aparece no balão do reportValidity().
    campo.setCustomValidity(mensagem);
    aplicarEstado(campo, mensagem);
    return campo.checkValidity();
}

/** Valida o formulário inteiro no envio e mostra o resumo dos erros. */
export function validarFormulario(formulario) {
    const campos = CAMPOS_CADASTRO.map((nome) => campoPrincipal(formulario, nome)).filter(Boolean);
    const invalidos = campos.filter((campo) => !validarCampo(campo));
    const feedback = formulario.querySelector('#feedback-formulario');

    if (invalidos.length > 0 || !formulario.checkValidity()) {
        feedback.innerHTML = templateErrosFormulario(invalidos.map(rotuloDoCampo));
        formulario.reportValidity();
        return false;
    }

    feedback.innerHTML = '';
    return true;
}

/** Remove classes, mensagens e erros personalizados (usado no reset). */
export function limparValidacao(formulario) {
    formulario.querySelectorAll('.campo-valido, .campo-invalido').forEach((elemento) => {
        elemento.classList.remove('campo-valido', 'campo-invalido');
    });
    formulario.querySelectorAll('[aria-invalid]').forEach((campo) => campo.removeAttribute('aria-invalid'));
    formulario.querySelectorAll('.mensagem-erro').forEach((area) => { area.textContent = ''; });
    formulario.querySelectorAll('input, select').forEach((campo) => campo.setCustomValidity(''));

    const feedback = formulario.querySelector('#feedback-formulario');
    if (feedback) {
        feedback.innerHTML = '';
    }

    // O reset só muda os valores depois deste evento; a máscara precisa esperar.
    setTimeout(sincronizarMascaras);
}

/* Dados do formulário -------------------------------------------------- */

export function obterDadosFormulario(formulario) {
    const dadosForm = new FormData(formulario);
    return Object.fromEntries(CAMPOS_CADASTRO.map((nome) => [nome, String(dadosForm.get(nome) ?? '').trim()]));
}

/** Preenche o formulário com um cadastro salvo e valida os campos preenchidos. */
export function preencherFormulario(formulario, dados) {
    CAMPOS_CADASTRO.forEach((nome) => {
        const valor = dados[nome];
        if (!valor) {
            return;
        }

        if (nome === 'participacao') {
            const opcao = formulario.querySelector(`input[name="participacao"][value="${CSS.escape(valor)}"]`);
            if (opcao) {
                opcao.checked = true;
            }
        } else if (formulario.elements[nome]) {
            formulario.elements[nome].value = valor;
        }
    });

    sincronizarMascaras();

    CAMPOS_CADASTRO.forEach((nome) => {
        const campo = campoPrincipal(formulario, nome);
        const preenchido = nome === 'participacao'
            ? formulario.querySelector('input[name="participacao"]:checked')
            : campo?.value;
        if (campo && preenchido) {
            validarCampo(campo);
        }
    });
}

/* Toast ---------------------------------------------------------------- */

/** Mostra uma mensagem temporária, anunciada por leitores de tela (role="status"). */
export function mostrarToast(mensagem, duracao = 4000) {
    const toast = document.getElementById('toast');
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
    }, duracao);
}
