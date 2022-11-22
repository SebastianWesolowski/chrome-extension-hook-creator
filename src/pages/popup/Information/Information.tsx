import React from "react";

const Information = ({
  handleMenuChange,
  settingShortcut,
  settingWebhook,
}: any) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-md font-bold text-gray-900">Information</h2>
      </div>
      <p className="text-sm py-2">
        Select the text and use the keyboard shortcut a+b. This will trigger a
        copy event, resulting in the selected content and a link to the current
        web page being placed in the clipboard.
      </p>
      <div className="flex-col items-center justify-between">
        <div className="flex-1 min-w-0 text-sm py-2">
          <b className="font-bold">Current Webhook:</b>

          <p className={"break-words"}>
            {settingWebhook === "" ? (
              <>
                {" "}
                <p className={"text-sm pb-1"}>No webhook set</p>
                <button
                  onClick={() => handleMenuChange("settings")}
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Go to setting and det webhook
                </button>
              </>
            ) : (
              settingWebhook
            )}
          </p>
        </div>
        <div className="flex-1 min-w-0 py-2">
          <b className="font-bold text-sm">Current shortcut:</b>
          <p className={"break-words"}>
            {settingShortcut.metaKey === false ||
            settingShortcut.metaKey === false ? (
              <>
                {" "}
                <p className={"text-sm pb-1"}>No shortcut set</p>
                <button
                  onClick={() => handleMenuChange("settings")}
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Go to setting and det shortcut
                </button>
              </>
            ) : (
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
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Information;
