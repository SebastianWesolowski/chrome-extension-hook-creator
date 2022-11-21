console.log("content loaded");

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
import("./components/Demo");

// import { printLine } from './modules/print';

// Keep track of clicked keys
const isKeyPressed = {
  a: false, // ASCII code for 'a'
  b: false, // ASCII code for 'b'
  // ... Other keys to check for custom key combinations
};

function sendMessage(content) {
  chrome.storage.sync.get(["settingsWebhook"], function (items) {
    if (items.settingsWebhook) {
      const request = new XMLHttpRequest();
      request.open("POST", items.settingsWebhook);

      request.setRequestHeader("Content-type", "application/json");

      const params = {
        DMQuickNote: content,
      };

      request.send(JSON.stringify(params));
    }
  });
}

let isShortcutPressed = false;

document.onkeydown = (keyDownEvent) => {
  // Track down key click
  isKeyPressed[keyDownEvent.key] = true;

  // Check described custom shortcut
  if (isKeyPressed["a"] && isKeyPressed["b"]) {
    isShortcutPressed = true;
    //Prevent default key actions, if desired
    keyDownEvent.preventDefault();
    document.execCommand("copy");
  }
};

document.onkeyup = (keyUpEvent) => {
  // Prevent default key actions, if desired
  keyUpEvent.preventDefault();

  // Track down key release
  isKeyPressed[keyUpEvent.key] = false;

  // when one of the keys is released, show text indicating
  // text is no longer clicked
  if (!isKeyPressed["a"] || !isKeyPressed["b"]) {
    isShortcutPressed = false;
    console.log("Shortcut clicked! UP");
  }
};

const copyListener = (event) => {
  if (isShortcutPressed) {
    const range = window.getSelection().getRangeAt(0);
    const rangeContents = range.cloneContents();
    const pageLink = `Read more at: ${document.location.href}`;
    const helper = document.createElement("div");

    helper.appendChild(rangeContents);

    event.clipboardData.setData(
      "text/plain",
      `${helper.innerText}\n${pageLink}`
    );
    event.clipboardData.setData(
      "text/html",
      `${helper.innerHTML}<br>${pageLink}`
    );
    sendMessage(`${helper.innerText}\n${pageLink}`);

    event.preventDefault();
  }
  isShortcutPressed = false;
};

document.addEventListener("copy", copyListener, true);
//Must reload extension for modifications to take effect.
