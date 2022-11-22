// import { printLine } from './modules/print';

// Keep track of clicked keys
const settingShortcut = {
  metaKey: null,
  secondKey: null,
};

const isKeyPressed = {};

chrome.storage.sync.get(["settingShortcut"], function (items) {
  settingShortcut.metaKey = items.settingShortcut.metaKey;
  settingShortcut.secondKey = items.settingShortcut.secondKey;

  isKeyPressed[settingShortcut.metaKey] = false;
  isKeyPressed[settingShortcut.secondKey] = false;
});

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
  if (
    isKeyPressed[settingShortcut.metaKey] &&
    isKeyPressed[settingShortcut.secondKey]
  ) {
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
  if (
    !isKeyPressed[settingShortcut.metaKey] ||
    !isKeyPressed[settingShortcut.secondKey]
  ) {
    isShortcutPressed = false;
    // console.log("Shortcut clicked! UP");
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
