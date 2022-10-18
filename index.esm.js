import {useEffect, useState} from "react";
import {includes, isString, pick, pickBy, reduce, sortBy} from "lodash";

const dfn = () => {
  return true;
};

function useHotKey(keys = [], domQuerySelectorOrFunc) {
  const [isPressed, setIsPressed] = useState(false);
  const _keys = (isString(keys) ? [keys] : keys).map((k) => rearrange(k));
  let _fn = dfn;
  if (isString(domQuerySelectorOrFunc)) {
    _fn = (evt) => hasEl(evt, domQuerySelectorOrFunc);
  }
  useEffect(() => {
    document.addEventListener("keydown", handlePress);
    return () => {
      document.removeEventListener("keydown", handlePress);
    };
  }, []);
  const handlePress = (evt) => {
    evt = evt || window.event;
    if (!evt)
      return;
    const pressedObj = pick(
        evt,
        ["altKey", "ctrlKey", "metaKey", "shiftKey", "key"]
    );
    const keysString = rearrange(
        getPressedKeysString(pressedObj, pressedObj.key)
    );
    const _isPressed = includes(_keys, keysString) && _fn(evt);
    setIsPressed(_isPressed);
  };
  return [isPressed, setIsPressed];
}
const useCtrlWithKey = (key, domQuerySelectorOrFunc) => {
  return useHotKey([`ctrl+${key}`, `meta+${key}`], domQuerySelectorOrFunc);
};
const useShiftWithKey = (key, domQuerySelectorOrFunc) => {
  return useHotKey(`shift+${key}`, domQuerySelectorOrFunc);
};
const useCtrlShiftWithKey = (key, domQuerySelectorOrFunc) => {
  return useCtrlWithKey(`shift+${key}`, domQuerySelectorOrFunc);
};
const useCtrlEnter = (domQuerySelectorOrFunc) => {
  return useCtrlWithKey("enter", domQuerySelectorOrFunc);
};
const useBackSpace = (domQuerySelectorOrFunc) => {
  return useHotKey(["backspace", "delete"], domQuerySelectorOrFunc);
};
const getPressedKeysString = (obj, mainKey) => {
  const specialKeyString = reduce(
      pickBy(obj),
      (res, v, k) => {
        if (`${k}`.includes("Key"))
          res += `${k}`.replace("Key", "") + "+";
        return res;
      },
      ""
  );
  return specialKeyString + mainKey;
};
const rearrange = (str) => {
  return sortBy(
      `${str}`.toLowerCase().replace(/ /g, "").split("+")
  ).join("+");
};
const hasEl = (evt, domQuerySelectorOrFunc) => !!document.activeElement.parentElement.querySelector(domQuerySelectorOrFunc);
export {
  useHotKey as default,
  useBackSpace,
  useCtrlEnter,
  useCtrlShiftWithKey,
  useCtrlWithKey,
  useShiftWithKey
};
