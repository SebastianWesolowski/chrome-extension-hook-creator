import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";

const ShortcutSettings = ({
  open,
  setOpen,
  settingShortcut,
  setRefreshPage,
}: any) => {
  const [isShortcutSave, setIsShortcutSave] = useState(false);
  const [isShortcutCaptured, setIsShortcutCaptured] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [shortcut, setShortcut] = useState<any>({
    metaKey: false,
    secondKey: false,
  });

  const [currentSettingShortcut, setCurrentSettingShortcut] = useState<any>({
    metaKey: settingShortcut.metaKey,
    secondKey: settingShortcut.secondKey,
  });

  useEffect(() => {
    if (settingShortcut.secondKey && settingShortcut.metaKey) {
      setCurrentSettingShortcut({
        metaKey: settingShortcut.metaKey,
        secondKey: settingShortcut.secondKey,
      });
    }
  }, []);

  const cancelButtonRef = useRef(null);

  const handleKeyPress = useCallback(
    (event) => {
      console.log("handleKeyPress -> event", event);
      if (isRecord) {
        const currentShortcut = shortcut;
        currentShortcut.secondKey = event.key;
        setShortcut(currentShortcut);
        setIsRecord(false);
        setIsShortcutCaptured(true);
      }
    },
    [isRecord, shortcut]
  );
  const handleMetaKeyPress = useCallback((event) => {
    const allowKeys = ["Tab", "Control", "Shift", "Alt", "Meta"];
    const allowKeysCode = [
      "ControlRight",
      17,
      "ShiftRight",
      "AltRight",
      "MetaRight",
    ];

    if (
      event.key.includes(allowKeys) ||
      event.code.includes(allowKeysCode) ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.keyCode === 9
    ) {
      setIsRecord(true);
      const secondKey = shortcut.secondKey;

      setShortcut({
        metaKey: event.key,
        secondKey,
      });
    }
  }, []);

  const handleKeyUp = useCallback((event) => {
    console.log(isRecord, event);
    if (isRecord && shortcut.secondKey !== false) {
      setIsRecord(false);
    }
  }, []);

  useEffect(() => {
    if (isShortcutSave) {
      setInterval(() => {
        setIsShortcutSave(false);
      }, 2000);
    }
  }, [isShortcutSave]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keydown", handleMetaKeyPress);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleMetaKeyPress);
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyPress, handleKeyUp]);

  const handleSettingChange = () => {
    if (
      (isShortcutSave && shortcut.secondKey !== false,
      shortcut.metaKey !== false)
    ) {
      chrome.storage.sync.set({ settingShortcut: shortcut }, function () {
        setRefreshPage(true);
        setIsShortcutSave(true);
        setCurrentSettingShortcut(shortcut);
      });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-2 px-2 pb-2 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="text-start sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Setup your shortcut
                  </Dialog.Title>
                  <div className="mt-2">
                    {isShortcutSave === true ? (
                      <div className="flex-row flex">
                        <div className="mr-1 flex items-center justify-center h-5 w-5 rounded-full bg-green-100 ">
                          <CheckIcon
                            className="h-3 w-3 text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mr-1">
                          New shortcut saved
                        </p>
                        <kbd>
                          {shortcut.metaKey ?? String(shortcut.metaKey)}
                        </kbd>
                        {shortcut.secondKey && (
                          <>
                            {" + "}
                            <kbd>{String(shortcut.secondKey)}</kbd>
                          </>
                        )}
                      </div>
                    ) : null}

                    {currentSettingShortcut.secondKey !== false &&
                    currentSettingShortcut.metaKey !== false ? (
                      <>
                        <p className="text-sm text-gray-500 mr-1">
                          Current shortcut:
                        </p>
                        <kbd>
                          {currentSettingShortcut.metaKey ??
                            String(currentSettingShortcut.metaKey)}
                        </kbd>
                        {currentSettingShortcut.secondKey && (
                          <>
                            {" + "}
                            <kbd>
                              {String(currentSettingShortcut.secondKey)}
                            </kbd>
                          </>
                        )}
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => {
                            chrome.storage.sync.set(
                              {
                                settingShortcut: {
                                  metaKey: false,
                                  secondKey: false,
                                },
                              },
                              function () {
                                setCurrentSettingShortcut({
                                  metaKey: false,
                                  secondKey: false,
                                });
                                setShortcut({
                                  metaKey: false,
                                  secondKey: false,
                                });
                              }
                            );
                          }}
                          ref={cancelButtonRef}
                        >
                          Clear current and set new shortcut
                        </button>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">
                        To start recording the keys you want to use, hold down 2
                        keys, one of which must be a function key (Ctrl, Option,
                        Command, Shift, Tab)
                      </p>
                    )}

                    {(isRecord || isShortcutCaptured) &&
                      (shortcut.metaKey || shortcut.metaKey) && (
                        <div className="my-2">
                          <p className="text-sm text-gray-500 mb-1 break-normal">
                            Captured shortcut{" "}
                          </p>
                          <kbd>
                            {shortcut.metaKey ?? String(shortcut.metaKey)}
                          </kbd>
                          {shortcut.secondKey && (
                            <>
                              {" + "}
                              <kbd>{String(shortcut.secondKey)}</kbd>
                            </>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                {isShortcutCaptured === true ? (
                  <>
                    <p className="text-sm text-gray-500">
                      This shortcut will be used to send data via the webhook
                    </p>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={() => {
                        setIsShortcutSave(true);
                        setIsShortcutCaptured(false);
                        handleSettingChange();
                      }}
                    >
                      Save shortcut
                    </button>
                  </>
                ) : null}

                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ShortcutSettings;
