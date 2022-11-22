import React from "react";
import Information from "@pages/popup/Information/Information";
import Settings from "@pages/popup/Settings/Settings";

const Pages = ({
  handleMenuChange,
  tabSelected,
  settingWebhook,
  settingShortcut,
}: any) => {
  return (
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
  );
};

export default Pages;
