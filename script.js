document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SLIDER INTERATIVO ANTES & DEPOIS
       ========================================================================== */
    const rangeInput = document.getElementById('comparisonRange');
    const afterLayer = document.getElementById('afterLayer');
    const sliderLine = document.getElementById('sliderLine');

    if (rangeInput && afterLayer && sliderLine) {
        rangeInput.addEventListener('input', (e) => {
            const val = e.target.value;
            afterLayer.style.width = `${val}%`;
            sliderLine.style.left = `${val}%`;
        });
    }

    /* ==========================================================================
       2. DINÂMICA DO MODAL DE TRATAMENTOS
       ========================================================================== */
    const modalTratamento = document.getElementById('modalTratamento');
    if (modalTratamento) {
        modalTratamento.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;
            const titulo = button.getAttribute('data-titulo');
            const descricao = button.getAttribute('data-descricao');

            const modalTitulo = modalTratamento.querySelector('#modalTitulo');
            const modalDescricao = modalTratamento.querySelector('#modalDescricao');
            const modalWhatsAppBtn = modalTratamento.querySelector('#modalWhatsAppBtn');

            modalTitulo.textContent = titulo;
            modalDescricao.textContent = descricao;

            const encodedMsg = encodeURIComponent(`Olá! Gostaria de agendar uma avaliação e saber mais sobre o tratamento: ${titulo}.`);
            modalWhatsAppBtn.href = `https://wa.me/5521995103410?text=${encodedMsg}`;
        });
    }

    /* ==========================================================================
       3. VALIDAÇÃO E GERAÇÃO DE MENSAGEM WHATSAPP (FORMULÁRIO)
       ========================================================================== */
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (whatsappForm.checkValidity()) {
                const nome = document.getElementById('nomePaciente').value.trim();
                const telefone = document.getElementById('telefonePaciente').value.trim();
                const tratamento = document.getElementById('tratamentoInteresse').value;
                const periodo = document.getElementById('melhorPeriodo').value;
                const obs = document.getElementById('mensagemAdicional').value.trim();

                let mensagem = `Olá, meu nome é *${nome}* (Tel: ${telefone}).\n`;
                mensagem += `Gostaria de agendar uma avaliação na Clínica Nathalia Patricio.\n`;
                mensagem += `*Tratamento de interesse:* ${tratamento}\n`;
                mensagem += `*Melhor período:* ${periodo}`;
                
                if (obs) {
                    mensagem += `\n*Observação:* ${obs}`;
                }

                const encodedMessage = encodeURIComponent(mensagem);
                const whatsappUrl = `https://wa.me/5521995103410?text=${encodedMessage}`;

                window.open(whatsappUrl, '_blank');
            }

            whatsappForm.classList.add('was-validated');
        }, false);
    }

    /* ==========================================================================
       4. BOTÃO VOLTAR AO TOPO & HEADER SCROLL EFFECT
       ========================================================================== */
    const backToTopBtn = document.getElementById('backToTop');
    const glassHeader = document.querySelector('.glass-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            if (backToTopBtn) backToTopBtn.classList.add('show');
        } else {
            if (backToTopBtn) backToTopBtn.classList.remove('show');
        }

        if (window.scrollY > 50) {
            if (glassHeader) glassHeader.style.background = 'rgba(26, 18, 32, 0.95)';
        } else {
            if (glassHeader) glassHeader.style.background = 'rgba(26, 18, 32, 0.85)';
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});