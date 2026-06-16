export function setupLiveCodeBlocks(root = document) {
  root.querySelectorAll("[data-live-code-copy]").forEach((button) => {
    if (button.dataset.liveCodeCopyReady === "true") {
      return;
    }

    button.dataset.liveCodeCopyReady = "true";
    button.addEventListener("click", async () => {
      const code = button.closest("[data-live-code-block]")?.querySelector("code");

      if (!code || !navigator.clipboard) {
        return;
      }

      try {
        await navigator.clipboard.writeText(code.textContent);
        showCopyState(button, "copied", "Copied");
      } catch {
        showCopyState(button, "failed", "Copy failed");
      }
    });
  });
}

function showCopyState(button, state, label) {
  window.clearTimeout(Number(button.dataset.copyStateTimeout));
  button.dataset.copyState = state;
  button.textContent = label;

  const timeoutId = window.setTimeout(() => {
    button.removeAttribute("data-copy-state");
    button.textContent = "Copy";
    delete button.dataset.copyStateTimeout;
  }, 1600);

  button.dataset.copyStateTimeout = String(timeoutId);
}
