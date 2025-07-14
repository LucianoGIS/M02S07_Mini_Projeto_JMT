document.addEventListener('DOMContentLoaded', () => {

    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies-btn');

    if (cookieBanner && acceptCookiesBtn) {
        if (!localStorage.getItem('cookie_consent_given')) {
            cookieBanner.classList.add('show');
        }
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent_given', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    const applyTheme = (isDark) => {
        if (isDark) {
            body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.textContent = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    };

    if (darkModeToggle) {
        const currentTheme = localStorage.getItem('darkMode');
        if (currentTheme === 'enabled') {
            applyTheme(true);
        } else {
            applyTheme(false);
        }
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-mode');
            applyTheme(!isDarkMode);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const partnerForm = document.getElementById('partnerForm');
    if (partnerForm) {
        partnerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {};
            
            data.nomeParceiro = formData.get('nomeParceiro');
            data.tipoParceiro = formData.get('tipoParceiro');
            data.responsavelParceiro = formData.get('responsavelParceiro');
            data.telResponsavel = formData.get('telResponsavel');
            data.emailResponsavel = formData.get('emailResponsavel');
            data.rua = formData.get('rua');
            data.numero = parseInt(formData.get('numero'));
            data.bairro = formData.get('bairro');
            data.dataCriacao = new Date().toISOString();
            
            data.papel = document.getElementById('papel').checked;
            data.plastico = document.getElementById('plastico').checked;
            data.vidro = document.getElementById('vidro').checked;
            data.metal = document.getElementById('metal').checked;
            data.oleoCozinha = document.getElementById('oleoCozinha').checked;
            data.pilhaBateria = document.getElementById('pilhaBateria').checked;
            data.eletronico = document.getElementById('eletronico').checked;
            data.roupa = document.getElementById('roupa').checked;
            data.outros = document.getElementById('outros').checked;
            
            try {
                const response = await fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    alert('Dados enviados com sucesso!');
                    this.reset();
                } else {
                    alert('Erro ao enviar dados. Tente novamente.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao enviar dados. Tente novamente.');
            }
        });
    }

});