// ==UserScript==
// @name         Automatiza 1Doc
// @namespace    http://tampermonkey.net/
// @version      4.1
// @description  Aciona um webhook do n8n e informa o usuário que o processo começou em segundo plano.
// @author       Você
// @match        https://altofeliz.1doc.com.br/*
// @grant        GM_xmlhttpRequest
// @connect      2f81a6ac47f0.ngrok-free.app
// ==/UserScript==

(function() {
    'use strict';

    // --- CONFIGURAÇÃO ESSENCIAL ---
    const n8nWebhookUrl = 'https://2f81a6ac47f0.ngrok-free.app/webhook/07f1980d-27a5-4723-b478-b99fdd6ac5d1';
    // --- FIM DA CONFIGURAÇÃO ---

    let isProcessing = false;

    function injectPopupStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .n8n-popup { position: fixed; bottom: 20px; right: 20px; padding: 16px 24px; border-radius: 8px; color: white; font-family: "Open Sans", Helvetica, Arial, sans-serif; font-size: 14px; z-index: 99999; box-shadow: 0 4px 12px rgba(0,0,0,0.15); opacity: 0; transform: translateY(20px); transition: opacity 0.3s ease, transform 0.3s ease; }
            .n8n-popup.show { opacity: 1; transform: translateY(0); }
            .n8n-popup-info { background-color: #0d47a1; }
            .n8n-popup-success { background-color: #28a745; }
            .n8n-popup-error { background-color: #dc3545; }
        `;
        document.head.appendChild(style);
    }

    function showPopup(message, type = 'info', duration = 6000) {
        const existingPopup = document.querySelector('.n8n-popup');
        if (existingPopup) existingPopup.remove();
        const popup = document.createElement('div');
        popup.className = `n8n-popup n8n-popup-${type}`;
        popup.textContent = message;
        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add('show'), 10);
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => { if (popup.parentNode) popup.remove() }, 300);
        }, duration);
    }

    function addNavbarItem() {
        const navbar = document.getElementById('menu_nav');
        if (!navbar) {
            setTimeout(addNavbarItem, 500);
            return;
        }

        const newLi = document.createElement('li');
        newLi.id = 'li_automatizar_n8n';
        const newLink = document.createElement('a');
        newLink.href = 'javascript:void(0);';
        newLink.className = 'lif';
        newLink.style.cursor = 'pointer';
        const newIcon = document.createElement('i');
        newIcon.className = 'icon-cloud-download icon-white';
        newIcon.style.marginRight = '4px';
        const linkText = document.createTextNode('Automatizar');
        newLink.appendChild(newIcon);
        newLink.appendChild(linkText);
        newLi.appendChild(newLink);
        navbar.appendChild(newLi);

        newLink.addEventListener('click', () => {
            if (isProcessing) return;
            isProcessing = true;

            // Muda a UI para indicar que algo começou
            newIcon.className = 'icon-refresh icon-spin icon-white';
            linkText.textContent = ' Processando...';

            // Dispara a requisição para o webhook do n8n.
            // Não vamos esperar por uma resposta, então não precisamos
            // de onload, onerror ou ontimeout.
            GM_xmlhttpRequest({
                method: 'GET',
                url: n8nWebhookUrl,
                timeout: 10000 // Timeout curto, já que não esperamos resposta
            });

            // Imediatamente mostra o popup de sucesso e atualiza o botão.
            // Isso acontece antes que a página possa recarregar e causar o erro.
            setTimeout(() => {
                showPopup('Automação iniciada! Processando em segundo plano...', 'success');
                newIcon.className = 'icon-ok icon-white';
                linkText.textContent = ' Iniciado!';
                setTimeout(resetState, 5000); // Reseta o botão após alguns segundos
            }, 500); // Pequeno delay para dar a sensação de processamento
        });

        function resetState() {
            newIcon.className = 'icon-cloud-download icon-white';
            linkText.textContent = 'Automatizar';
            isProcessing = false;
        }
    }

    window.addEventListener('load', () => {
        injectPopupStyles();
        addNavbarItem();
    });
})();