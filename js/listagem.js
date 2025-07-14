let allPartners = [];

document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        document.getElementById('userEmail').textContent = userEmail;
    } else {
        window.location.href = 'login.html';
    }
    loadPartners();
});

async function loadPartners() {
    const container = document.getElementById('partnersContainer');
    try {
        const response = await fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros');
        allPartners = await response.json();
        displayPartners(allPartners);
    } catch (error) {
        console.error('Erro ao carregar parceiros:', error);
        container.innerHTML = `<div class="empty-state"><h3>Erro ao carregar os dados. Tente novamente mais tarde.</h3></div>`;
    }
}

function displayPartners(partners) {
    const container = document.getElementById('partnersContainer');
    if (partners.length === 0) {
        container.innerHTML = `<div class="empty-state"><h3>Nenhum parceiro encontrado.</h3></div>`;
        return;
    }
    const partnersGrid = document.createElement('div');
    partnersGrid.className = 'partners-grid';
    partners.forEach(partner => partnersGrid.appendChild(createPartnerCard(partner)));
    container.innerHTML = '';
    container.appendChild(partnersGrid);
}

function createPartnerCard(partner) {
    const card = document.createElement('div');
    card.className = 'partner-card';
    card.onclick = () => viewPartnerDetails(partner.id);
    
    const typeMap = { 'ECO': 'Ecoponto', 'COO': 'Cooperativa', 'PEV': 'Ponto de Entrega Voluntária' };
    const avatarMap = { 'ECO': '🏢', 'COO': '🤝', 'PEV': '📦' };
    
    // CORREÇÃO: Alterado de partner.createdAt para partner.dataCriacao
    const registrationDate = new Date(partner.dataCriacao).toLocaleDateString('pt-BR');

    card.innerHTML = `
        <div class="partner-header">
            <div class="partner-avatar ${partner.tipoParceiro.toLowerCase()}">${avatarMap[partner.tipoParceiro] || '📋'}</div>
            <div class="partner-info">
                <h3>${partner.nomeParceiro}</h3>
                <div class="partner-type">${typeMap[partner.tipoParceiro] || 'N/A'}</div>
            </div>
        </div>
        <div class="partner-detail"><span>📍</span><span><b>Bairro:</b> ${partner.bairro}</span></div>
        <div class="partner-date">
            Cadastrado em: ${registrationDate}
        </div>
    `;
    return card;
}

function searchPartners() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const filtered = allPartners.filter(p =>
        p.nomeParceiro.toLowerCase().includes(searchTerm) ||
        p.bairro.toLowerCase().includes(searchTerm)
    );
    displayPartners(filtered);
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    displayPartners(allPartners);
}

function viewPartnerDetails(partnerId) {
    window.location.href = `detalhes-parceiro.html?id=${partnerId}`;
}

function logout() {
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}

document.getElementById('searchInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        searchPartners();
    }
});