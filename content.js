(() => {
  const TARGET_TEXTS = ["buradayım", "i'm here", "i am here"];
  const clickedElements = new WeakSet();
  const trackedElements = new Set();

  function elementText(element) {
    return (element.innerText || element.textContent || "").replace(/\s+/g, " ").trim();
  }

  function hasTargetText(element) {
    const text = elementText(element).toLocaleLowerCase("tr-TR");
    return TARGET_TEXTS.some((target) => text.includes(target));
  }

  function isVisible(element) {
    const style = window.getComputedStyle(element);

    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      style.opacity !== "0" &&
      element.getClientRects().length > 0
    );
  }

  function findTarget() {
    const matches = Array.from(document.querySelectorAll("button, div")).filter(
      hasTargetText
    );

    // Allow a reused attendance element to be clicked again after its label disappears.
    for (const element of trackedElements) {
      if (!element.isConnected || !hasTargetText(element)) {
        trackedElements.delete(element);
        clickedElements.delete(element);
      }
    }

    const available = matches.filter(
      (element) => !clickedElements.has(element) && isVisible(element) && !element.disabled
    );
    const button = available.find((element) => element.matches("button"));
    if (button) return button;

    return available
      .filter((element) => element.matches("div"))
      .sort((a, b) => elementText(a).length - elementText(b).length)[0];
  }

  function clickTarget() {
    const target = findTarget();
    if (!target) return;

    // Track before clicking so click-triggered DOM mutations cannot trigger a loop.
    clickedElements.add(target);
    trackedElements.add(target);

    try {
      target.click();
    } catch (error) {
      clickedElements.delete(target);
      trackedElements.delete(target);
      console.error("Perculus Here Button: click failed", error);
    }
  }

  const observer = new MutationObserver(clickTarget);
  observer.observe(document.documentElement, {
    childList: true,
    characterData: true,
    attributes: true,
    subtree: true
  });

  // Recheck on focus and after background-tab throttling or a temporary page freeze.
  document.addEventListener("visibilitychange", () => {
    clickTarget();
  });
  window.addEventListener("focus", () => {
    clickTarget();
  });
  document.addEventListener("resume", clickTarget);
  window.setInterval(clickTarget, 1000);

  clickTarget();
})();
