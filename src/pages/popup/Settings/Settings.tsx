import React, { useEffect, useState } from "react";
import ShortcutSettings from "@pages/popup/Settings/ShortcutSettings";
import { CheckIcon } from "@heroicons/react/solid";

const Settings = ({ settingShortcut, settingWebhook, setRefreshPage }: any) => {
  const [currentSettingShortcut, setCurrentSettingShortcut] =
    useState(settingShortcut);
  const [currentSettingWebhook, setCurrentSettingWebhook] =
    useState(settingWebhook);

  const [currentSettingTemplate, setCurrentSettingTemplate] = useState("");
  const [isSave, setIsSave] = useState(false);
  const [isSaveTemplate, setIsSaveTemplate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(
      ["settingsWebhook", "settingShortcut"],
      function (items) {
        if (items?.settingsWebhook) {
          setCurrentSettingWebhook(items.settingsWebhook);
        }

        if (items?.settingShortcut) {
          setCurrentSettingShortcut(items.settingShortcut);
        }
      }
    );
  }, [isOpen]);

  useEffect(() => {
    chrome.storage.sync.get(["settingTemplate"], function (items) {
      if (items?.settingTemplate) {
        setCurrentSettingTemplate(items.settingTemplate);
      } else {
        setCurrentSettingTemplate(`%%selected%% 
Read more: %%url%% 
Date: %%date%%`);
      }
    });
  }, [isOpen]);

  useEffect(() => {
    if (isSave) {
      setInterval(() => {
        setIsSave(false);
      }, 2000);
    }
  }, [isSave]);

  useEffect(() => {
    if (isSaveTemplate) {
      setInterval(() => {
        setIsSaveTemplate(false);
      }, 2000);
    }
  }, [isSaveTemplate]);

  const handleOnChange = (e) => {
    setCurrentSettingWebhook(e.target.value);
  };

  const handleOnTemplateChange = (e) => {
    setCurrentSettingTemplate(e.target.value);
  };

  const handleSettingChange = () => {
    chrome.storage.sync.set(
      { settingsWebhook: currentSettingWebhook },
      function () {
        setRefreshPage(true);
        setIsSave(true);
      }
    );
  };

  const handleTemplateSettingChange = () => {
    chrome.storage.sync.set(
      { settingTemplate: currentSettingTemplate },
      function () {
        setRefreshPage(true);
        setIsSaveTemplate(true);
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
          <label htmlFor="webhook" className="block text-sm font-medium">
            Webhook
          </label>
          <div className="mt-1">
            <textarea
              value={currentSettingWebhook}
              onChange={handleOnChange}
              rows={3}
              name="webhook"
              id="webhook"
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

        {currentSettingShortcut.metaKey !== false &&
        currentSettingShortcut.secondKey !== false ? (
          <>
            <kbd>
              {currentSettingShortcut.metaKey ??
                String(currentSettingShortcut.metaKey)}
            </kbd>
            {currentSettingShortcut.secondKey && (
              <>
                {" + "}
                <kbd>{String(currentSettingShortcut.secondKey)}</kbd>
              </>
            )}
            <br />
          </>
        ) : null}

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="mt-1 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {currentSettingShortcut.metaKey !== false &&
          currentSettingShortcut.secondKey !== false
            ? "Set new shortcut"
            : "Set shortcut"}
        </button>
        {isOpen && (
          <ShortcutSettings
            setRefreshPage={setRefreshPage}
            open={isOpen}
            setOpen={setIsOpen}
            settingShortcut={currentSettingShortcut}
          />
        )}
      </div>
      <div className={"mt-2"}>
        <label htmlFor="comment" className="block text-sm font-medium">
          Template
        </label>
        <p className="text-sm py-2">
          Here you can change the smart template for the content to be sent via
          webhook.
        </p>
        <p className="text-sm font-bold">Allowed smart tag:</p>
        <div className={"break-words"}>
          <p className="text-sm">
            %%highlighted%% - highlighted text from page
          </p>
          <p className="text-sm">%%date%% - current date time in ISO format</p>
          <p className="text-sm">%%url%% - URL of the active website </p>
        </div>
        <div className="mt-1">
          <textarea
            value={currentSettingTemplate}
            onChange={handleOnTemplateChange}
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
              handleTemplateSettingChange();
            }}
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save new Template
          </button>
          {isSaveTemplate && (
            <div className="ml-2 flex flex-row items-center">
              <div className="mr-1 flex items-center justify-center h-5 w-5 rounded-full bg-green-100 ">
                <CheckIcon
                  className="h-3 w-3 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm text-gray-500 mr-1">New template saved</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
