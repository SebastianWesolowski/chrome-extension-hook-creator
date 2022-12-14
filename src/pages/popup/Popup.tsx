import React, { useEffect, useState } from "react";
import Pages from "@pages/popup/Pages";

const Popup = () => {
  const [refreshPage, setRefreshPage] = useState(false);
  const [tabSelected, setTabSelected] = useState("information");
  const [settingWebhook, setSettingWebhook] = useState("");
  const [settingShortcut, setSettingShortcut] = useState({
    metaKey: false,
    secondKey: false,
  });
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(
      ["settingsWebhook", "settingShortcut"],
      function (items) {
        if (items?.settingsWebhook) {
          setSettingWebhook(items.settingsWebhook);
        }

        if (items?.settingShortcut) {
          setSettingShortcut(items.settingShortcut);
        }
      }
    );
  }, []);

  useEffect(() => {
    chrome.storage.sync.get(
      ["settingsWebhook", "settingShortcut"],
      function (items) {
        if (items?.settingsWebhook) {
          setSettingWebhook(items.settingsWebhook);
        }

        if (items?.settingShortcut) {
          setSettingShortcut(items.settingShortcut);
        }
      }
    );
  }, [tabSelected]);

  //
  useEffect(() => {
    if (isSave) {
      setInterval(() => {
        setIsSave(false);
      }, 1000);
    }
  }, [isSave]);
  //
  const handleMenuChange = (selectedMenu) => {
    setTabSelected(selectedMenu);
  };

  const twSelected =
    "border-transparent text-white bg-indigo-600 hover:bg-indigo-700";
  const twDefault = "border-gray-300 text-gray-700 bg-white hover:bg-gray-50";

  return (
    <>
      {refreshPage ? (
        <nav
          style={{
            background: "linear-gradient(115deg, #80344a 0%, #e1396a 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-8">
              <p className={"text-sm pb-1 text-white"}>
                Reload web page to use the current settings
              </p>
            </div>
          </div>
        </nav>
      ) : null}
      <div className="p-2 flex-col justify-between flex h-max">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Hook Creator
            </h1>
          </div>
          <div className="flex mt-0 ml-4">
            <button
              onClick={() => handleMenuChange("information")}
              type="button"
              className={`${
                tabSelected === "information" ? twSelected : twDefault
              }inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Information
            </button>
            <button
              onClick={() => handleMenuChange("settings")}
              type="button"
              className={`ml-3 ${
                tabSelected === "settings" ? twSelected : twDefault
              }inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Settings
            </button>
          </div>
        </div>
        <Pages
          setRefreshPage={setRefreshPage}
          tabSelected={tabSelected}
          handleMenuChange={handleMenuChange}
          settingWebhook={settingWebhook}
          settingShortcut={settingShortcut}
        />
      </div>
    </>
  );
};

export default Popup;
