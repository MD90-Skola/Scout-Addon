let popup;

document.addEventListener('mousemove', (e) => {
    if (e.ctrlKey && e.shiftKey) {
        const card = e.target.closest('cw-csgo-market-item-card-wrapper');
        if (card) {
            const text = card.textContent.trim();

            const nameMatch = text.match(/^(.*?)\s+\d/);
            const priceMatch = text.match(/(\d[\d,\.]*)/);
            const procentMatch = text.match(/([+\-]?\d+\.?\d*)%/);

            const name = nameMatch ? nameMatch[1] : 'N/A';
            const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '')) : null;
            const currentMarkup = procentMatch ? parseFloat(procentMatch[1]) : 0; // fallback till 0%
            const targetMarkup = 12;

            const markupDiff = targetMarkup - currentMarkup;
            let profit = 'N/A';

            if (price !== null && markupDiff > 0) {
                profit = (price * (markupDiff / 100)).toFixed(2);
            }

            if (!popup) {
                popup = document.createElement('div');
                popup.style.position = 'fixed';
                popup.style.padding = '10px';
                popup.style.background = '#222';
                popup.style.color = '#fff';
                popup.style.borderRadius = '8px';
                popup.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.2)'; // green glow
                popup.style.fontSize = '14px';
                popup.style.zIndex = 9999;
                popup.style.pointerEvents = 'none';
                popup.style.width = '240px';
                popup.style.lineHeight = '1.4';
                document.body.appendChild(popup);
            }

            popup.innerHTML = `
                <div style="font-size: 15px; font-weight: bold; color: #aaa; margin-bottom: 6px;">${name}</div>
                <div style="margin-bottom: 4px; color: #888;">
                    Nuvarande markup: <strong style="color:#ccc;">${currentMarkup}%</strong>
                </div>
                <div style="margin-top: 8px; padding: 10px; background: #111; border-radius: 6px;">
                    <div style="color: #888;">Kvar till max: <strong style="color: #ccc;">${markupDiff.toFixed(1)}%</strong></div>
                    <div style="margin-top: 10px; font-size: 16px; color: lightgreen; font-weight: bold;">
                        Vinst: ${profit} 🪙
                    </div>
                </div>
            `;

            popup.style.left = (e.clientX + 15) + 'px';
            popup.style.top = (e.clientY + 15) + 'px';
        }
    } else if (popup) {
        popup.remove();
        popup = null;
    }
});
