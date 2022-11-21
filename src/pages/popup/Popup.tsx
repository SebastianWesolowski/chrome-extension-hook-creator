import React, { useEffect, useState } from "react";
import Information from "@pages/popup/Information/Information";
import Settings from "@pages/popup/Settings/Settings";
// import logo from "@assets/img/logo.svg";
// import "@pages/popup/Popup.css";

const Popup = () => {
  const [tabSelected, setTabSelected] = useState("settings");
  const [settingWebhook, setSettingWebhook] = useState("");
  const [settingShortcut, setSettingShortcut] = useState("");
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(["settingsWebhook"], function (items) {
      if (items?.settingsWebhook) {
        setSettingWebhook(items.settingsWebhook);
        setSettingWebhook(
          "https://hook.eu1.make.com/ezuap8h53exrxegw94a2q3r3dshqgvgq"
        );
      }

      if (items?.setSettingShortcut) {
        setSettingShortcut(items.setSettingShortcut);
        setSettingShortcut("alt+shift+1");
      }
    });
  }, []);

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

  const handleWebhookChange = (e) => {
    setSettingWebhook(e.target.value);
    chrome.storage.sync.set({ settingsWebhook: e.target.value }, function () {
      setIsSave(true);
    });
  };

  const twSelected =
    "border-transparent text-white bg-indigo-600 hover:bg-indigo-700";
  const twDefault = "border-gray-300 text-gray-700 bg-white hover:bg-gray-50";

  return (
    <div className="p-2">
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
      <div className="mt-2">
        <div className="flex flex-col">
          {tabSelected === "information" && (
            <Information
              handleMenuChange={handleMenuChange}
              settingWebhook={settingWebhook}
              settingShortcut={settingShortcut}
            />
          )}
          {tabSelected === "settings" && (
            <Settings
              settingWebhook={settingWebhook}
              settingShortcut={settingShortcut}
            />
          )}
        </div>
      </div>
    </div>

    // <div className="App">
    //   <section className="App-header">
    //     <h1 className="text-2xl font-bold">Hook Creator</h1>
    //     <p className="text-sm py-2">
    //       Select the text and use the keyboard shortcut a+b. This will trigger a
    //       copy event, resulting in the selected content and a link to the
    //       current web page being placed in the clipboard.
    //     </p>
    //     <p className="text-sm font-bold py-2">Setup Webhook:</p>
    //     <textarea
    //       cols={30}
    //       rows={3}
    //       value={settingWebhook}
    //       onChange={handleWebhookChange}
    //     ></textarea>
    //     {isSave && <p>{`Webhook Saved: ${settingWebhook}`}</p>}
    //     {/*<button onClick={() => handleClicked()}>Save Webhook</button>*/}
    //   </section>
    // </div>
  );
};

export default Popup;
