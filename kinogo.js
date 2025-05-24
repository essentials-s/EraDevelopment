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

  // Создаем кнопку очистки
  const btn = document.createElement("div");
  btn.textContent = "🧹 Очистить рекламу";
  btn.style = style;
  btn.onclick = () => {
    clearAll();
    alert("✅ Реклама и белый экран удалены!");
  };
  document.body.appendChild(btn);

  function clearAll() {
    // Удаляем рекламу
    document.querySelectorAll(
      'iframe, .adsbygoogle, .banner, .ad, .ads, .reklama, .overlay, .popup, [id*="ad"], [class*="ad"]'
    ).forEach((el) => el.remove());

    // Удаляем белый фон
    document.querySelectorAll("*").forEach((el) => {
      const bg = window.getComputedStyle(el).backgroundColor;
      if (bg === "rgb(255, 255, 255)" && el.offsetHeight > 300) {
        el.remove();
      }
    });

    // Удаляем подозрительные фуллскрин элементы
    document.querySelectorAll("[style]").forEach((el) => {
      const style = el.getAttribute("style");
      if (
        style.includes("position: fixed") &&
        style.includes("z-index") &&
        el.offsetHeight >= window.innerHeight * 0.8
      ) {
        el.remove();
      }
    });

    // Удаление белого экрана по ID (часто используется `#fblock`, `#adblock`, `#fdiv`)
    ["fblock", "adblock", "fdiv", "fade", "blocker"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    // Защита от повторного появления
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = `
      #fblock, #adblock, #fdiv, .fade, .blocker {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      body[style*="overflow: hidden"] {
        overflow: auto !important;
      }
    `;
    document.head.appendChild(styleBlock);

    // Блокировка вредных функций
    window.open = () => null;
    window.alert = () => null;
    window.confirm = () => true;
    window.onbeforeunload = null;
  }

  // Постоянная зачистка каждые 2 сек
  setInterval(clearAll, 2000);
})();
