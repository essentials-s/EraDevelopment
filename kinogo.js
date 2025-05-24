(function () {
  const style = `
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 999999;
    padding: 10px 16px;
    background: rgba(0,0,0,0.85);
    color: white;
    border-radius: 12px;
    font-size: 14px;
    font-family: sans-serif;
    box-shadow: 0 0 10px #000;
    cursor: pointer;
    user-select: none;
  `;

  // Создаем кнопку
  const btn = document.createElement("div");
  btn.textContent = "🧹 Очистить рекламу";
  btn.style = style;
  btn.onclick = () => {
    clearAds();
    alert("✅ Реклама удалена!");
  };
  document.body.appendChild(btn);

  // Основная функция удаления рекламы
  function clearAds() {
    // Удаляем баннеры, iframe, классы и ID, связанные с рекламой
    document.querySelectorAll(
      'iframe, .adsbygoogle, .banner, .ad, .ads, .reklama, .overlay, .popup, [id*="ad"], [class*="ad"]'
    ).forEach((el) => el.remove());

    // Блокируем всплывающие элементы
    document.querySelectorAll('[style*="z-index"]').forEach((el) => {
      const html = el.innerHTML || "";
      if (
        el.innerText.includes("Реклама") ||
        html.length < 300 ||
        el.offsetHeight < 100
      ) {
        el.remove();
      }
    });

    // Перезагружаем iframe без параметров (убираем рекламные ссылки)
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      if (iframe.src.includes("?")) {
        const cleanSrc = iframe.src.split("?")[0];
        iframe.src = cleanSrc;
      }
    });

    // Блокируем auto-open рекламы
    window.open = () => null;
    window.alert = () => null;
    window.confirm = () => true;
    window.onbeforeunload = null;
  }

  // Повторно очищаем рекламу каждые 3 сек (на случай, если появится заново)
  setInterval(clearAds, 3000);
})();
