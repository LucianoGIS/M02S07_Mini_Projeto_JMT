# M02S07_Mini_Projeto_JMT# EcoJoinville - Coleta Seletiva Inteligente

## Sobre o Projeto

O **EcoJoinville** é uma plataforma digital interativa desenvolvida para apoiar as ações de coleta seletiva na cidade de Joinville-SC. O projeto visa centralizar informações, engajar a população e fornecer uma ferramenta de gestão para os administradores do programa, tudo em alinhamento com os **Objetivos de Desenvolvimento Sustentável (ODS) 11 e 12 da ONU**, que promovem cidades mais sustentáveis e o consumo consciente.

A plataforma é dividida em duas frentes principais:
1.  **Uma Landing Page pública:** Para educar e convidar cidadãos e empresas a participarem da rede de coleta.
2.  **Um Painel Administrativo restrito:** Para monitorar e gerenciar os parceiros cadastrados.

---

## Funcionalidades

### Página Pública (`index.html`)

- **Seções Informativas:** Apresentação clara do projeto, seus objetivos e o impacto da reciclagem.
- **Formulário de Cadastro:** Permite que Ecopontos, Cooperativas e Pontos de Entrega Voluntária se cadastrem como parceiros.
- **Modo Escuro:** Um botão para alternar entre os temas claro e escuro, melhorando a experiência do usuário.
- **Banner de Cookies:** Aviso de consentimento de cookies para conformidade com a LGPD, com a preferência do usuário salva no `localStorage`.
- **Design Responsivo:** Interface adaptável para desktops, tablets e celulares.
- **Rodapé Interativo:** Com links para os parceiros institucionais (Prefeitura, Lab365, SENAI).

### Painel Administrativo (`/admin`)

- **Tela de Login:** Acesso restrito para administradores.
- **Listagem Dinâmica:** Exibição de todos os parceiros cadastrados, com dados consumidos em tempo real de uma API.
- **Busca Inteligente:** Ferramenta para pesquisar parceiros por nome ou bairro.
- **Visualização de Detalhes:** Ao clicar em um parceiro, uma página dedicada exibe todas as suas informações, incluindo contato, endereço e tipos de resíduos aceitos.

---

## Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias web fundamentais, sem o uso de frameworks, para focar nos conceitos básicos de desenvolvimento front-end.

- **HTML5:** Para a estruturação semântica do conteúdo.
- **CSS3:** Para estilização, layout (Flexbox e Grid) e design responsivo.
- **JavaScript (Vanilla JS):** Para toda a interatividade, incluindo:
    - Manipulação do DOM.
    - Consumo de API com `fetch` (operações GET e POST).
    - Gerenciamento de estado local com `localStorage`.
    - Eventos e lógica de negócio.
- **MockAPI:** Utilizada como um backend simulado para persistência e consulta dos dados dos parceiros.

---

## Estrutura de Arquivos

O projeto está organizado de forma a separar claramente a área pública da administrativa.

```
/
|-- admin/
|   |-- login.html
|   |-- listagem-parceiros.html
|   |-- detalhes-parceiro.html
|
|-- css/
|   |-- style.css
|   |-- admin-style.css
|
|-- js/
|   |-- main.js
|   |-- login.js
|   |-- listagem.js
|   |-- detalhes.js
|
|-- index.html
|-- README.md
```

---

## Como Executar

Por ser um projeto puramente front-end, não é necessária uma compilação ou instalação complexa.

1.  Clone este repositório para a sua máquina local.
2.  Abra o arquivo `index.html` no seu navegador de preferência.
3.  **Recomendação:** Para uma melhor experiência e para evitar possíveis problemas de política de segurança do navegador (CORS), recomenda-se usar a extensão **Live Server** do Visual Studio Code, que cria um servidor de desenvolvimento local.