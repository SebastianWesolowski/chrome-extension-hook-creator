import React, { useEffect, useState } from "react";
import ShortcutSettings from "@pages/popup/Settings/ShortcutSettings";
import { CheckIcon } from "@heroicons/react/solid";

const Settings = ({ settingShortcut, settingWebhook }: any) => {
  const [currentSettingWebhook, setCurrentSettingWebhook] =
    useState(settingWebhook);
  const [isSave, setIsSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSave) {
      setInterval(() => {
        setIsSave(false);
      }, 2000);
    }
  }, [isSave]);

  const handleOnChange = (e) => {
    setCurrentSettingWebhook(e.target.value);
  };
  const handleSettingChange = () => {
    chrome.storage.sync.set(
      { settingsWebhook: currentSettingWebhook },
      function () {
        setIsSave(true);
      }
    );
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
              value={currentSettingWebhook}
              onChange={handleOnChange}
              rows={3}
              name="comment"
              id="comment"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              defaultValue={""}
            />
          </div>
          <div className="flex-row flex items-center mt-1">
            <button
              onClick={() => {
                handleSettingChange();
              }}
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {settingWebhook ? "Set new Webhook" : "Save webhook"}
            </button>
            {isSave && (
              <div className="ml-2 flex flex-row items-center">
                <div className="mr-1 flex items-center justify-center h-5 w-5 rounded-full bg-green-100 ">
                  <CheckIcon
                    className="h-3 w-3 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm text-gray-500 mr-1">New webhook saved</p>
              </div>
            )}
          </div>
        </div>
        <p className="block text-sm font-medium mt-1">Shortcut</p>
        <>
          <kbd>
            {settingShortcut.metaKey ?? String(settingShortcut.metaKey)}
          </kbd>
          {settingShortcut.secondKey && (
            <>
              {" + "}
              <kbd>{String(settingShortcut.secondKey)}</kbd>
            </>
          )}
        </>
        <br />

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="mt-1 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {settingShortcut.metaKey !== false &&
          settingShortcut.secondKey !== false
            ? "Set new shortcut"
            : "Set shortcut"}
        </button>
        {isOpen && (
          <ShortcutSettings
            open={isOpen}
            setOpen={setIsOpen}
            settingShortcut={settingShortcut}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
