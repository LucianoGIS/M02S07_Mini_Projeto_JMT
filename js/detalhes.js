document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.getElementById('detailsContainer');

    const params = new URLSearchParams(window.location.search);
    const partnerId = params.get('id');

    if (!partnerId) {
        detailContainer.innerHTML = '<p>ID do parceiro não fornecido. <a href="listagem-parceiros.html">Volte para a listagem</a>.</p>';
        return;
    }

    async function fetchPartnerDetails() {
        try {
            const response = await fetch(`https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros/${partnerId}`);
            if (!response.ok) {
                throw new Error('Parceiro não encontrado.');
            }
            const partner = await response.json();
            displayPartnerDetails(partner);
        } catch (error) {
            detailContainer.innerHTML = `<p>Erro ao carregar detalhes: ${error.message}</p>`;
        }
    }

    function displayPartnerDetails(partner) {
        const typeMap = { 'ECO': 'Ecoponto', 'COO': 'Cooperativa', 'PEV': 'Ponto de Entrega Voluntária' };
        const avatarMap = { 'ECO': '🏢', 'COO': '🤝', 'PEV': '📦' };
        const partnerTypeClass = partner.tipoParceiro.toLowerCase();
        const partnerTypeIcon = avatarMap[partner.tipoParceiro] || '📋';
        const partnerTypeName = typeMap[partner.tipoParceiro] || 'N/A';

        const date = new Date(partner.dataCriacao);
        const registrationDate = !isNaN(date) ? date.toLocaleString('pt-BR') : 'Data indisponível';

        const acceptedWastes = [];
        if (partner.papel) acceptedWastes.push('Papel');
        if (partner.plastico) acceptedWastes.push('Plástico');
        if (partner.vidro) acceptedWastes.push('Vidro');
        if (partner.metal) acceptedWastes.push('Metal');
        if (partner.oleoCozinha) acceptedWastes.push('Óleo de cozinha');
        if (partner.pilhaBateria) acceptedWastes.push('Pilhas e baterias');
        if (partner.eletronico) acceptedWastes.push('Eletrônicos');
        if (partner.roupa) acceptedWastes.push('Roupas');
        if (partner.outros) acceptedWastes.push('Outros');

        detailContainer.innerHTML = `
            <div class="detail-container">
                <div class="detail-header">
                    <div class="partner-avatar-large ${partnerTypeClass}">
                        ${partnerTypeIcon}
                    </div>
                    <h2 class="partner-name">${partner.nomeParceiro}</h2>
                    <div class="partner-type-large">${partnerTypeName}</div>
                    <div class="partner-date-large">Data de Cadastro: ${registrationDate}</div>
                </div>
                <div class="detail-content">
                    <div class="detail-sections">
                        <div class="detail-section">
                            <h3 class="section-title">Responsável</h3>
                            <div class="detail-item">
                                <div class="detail-label">Nome</div>
                                <div class="detail-value">${partner.responsavelParceiro}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Telefone</div>
                                <div class="detail-value">${partner.telResponsavel}</div>
                            </div>
                             <div class="detail-item">
                                <div class="detail-label">E-mail</div>
                                <div class="detail-value">${partner.emailResponsavel}</div>
                            </div>
                        </div>
                        <div class="detail-section">
                            <h3 class="section-title">Endereço</h3>
                            <div class="detail-item">
                                <div class="detail-label">Rua</div>
                                <div class="detail-value">${partner.rua}, ${partner.numero}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Bairro</div>
                                <div class="detail-value">${partner.bairro}</div>
                            </div>
                        </div>
                        <div class="detail-section waste-types-section">
                            <h3 class="section-title">Resíduos Aceitos</h3>
                             <div class="waste-types-grid">
                                ${acceptedWastes.map(waste => `<div class="waste-type-item accepted">${waste}</div>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    fetchPartnerDetails();
});