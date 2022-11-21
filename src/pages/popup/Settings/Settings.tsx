import React, { useEffect, useState } from "react";
import ShortcutSettings from "@pages/popup/Settings/ShortcutSettings";
// import logo from "@assets/img/logo.svg";
// import "@pages/popup/Settings.css";

const Settings = ({ settingShortcut, settingWebhook }: any) => {
  const [isSave, setIsSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSave) {
      setInterval(() => {
        setIsSave(false);
      }, 1000);
    }
  }, [isSave]);

  const handleSettingChange = (e) => {
    // setSettingWebhook(e.target.value);
    // chrome.storage.sync.set({ settingsWebhook: e.target.value }, function () {
    //   setIsSave(true);
    // });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-md font-bold text-gray-900">Settings</h2>
      </div>
      <p className="text-sm py-2">
        You can change the shortcut and the webhook.
      </p>
      <div className="flex-col items-center justify-between">
        <div className={"mb-2"}>
          <label htmlFor="comment" className="block text-sm font-medium">
            Webhook
          </label>
          <div className="mt-1">
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              defaultValue={""}
            />
          </div>
        </div>
        <p className="block text-sm font-medium mb-1">Shortcut</p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Set Shortcut
        </button>
        <ShortcutSettings open={isOpen} setOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Settings;
