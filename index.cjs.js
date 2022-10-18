"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", {value: true}), mod);
var use_hot_key_element_exports = {};
__export(use_hot_key_element_exports, {
  default: () => useHotKey,
  useBackSpace: () => useBackSpace,
  useCtrlEnter: () => useCtrlEnter,
  useCtrlShiftWithKey: () => useCtrlShiftWithKey,
  useCtrlWithKey: () => useCtrlWithKey,
  useShiftWithKey: () => useShiftWithKey
});
module.exports = __toCommonJS(use_hot_key_element_exports);
var import_react = require("react");
var import_lodash = require("lodash");
const dfn = () => {
  return true;
};

function useHotKey(keys = [], domQuerySelectorOrFunc) {
  const [isPressed, setIsPressed] = (0, import_react.useState)(false);
  const _keys = ((0, import_lodash.isString)(keys) ? [keys] : keys).map((k) => rearrange(k));
  let _fn = dfn;
  if ((0, import_lodash.isString)(domQuerySelectorOrFunc)) {
    _fn = (evt) => hasEl(evt, domQuerySelectorOrFunc);
  }
  (0, import_react.useEffect)(() => {
    document.addEventListener("keydown", handlePress);
    return () => {
      document.removeEventListener("keydown", handlePress);
    };
  }, []);
  const handlePress = (evt) => {
    evt = evt || window.event;
    if (!evt)
      return;
    const pressedObj = (0, import_lodash.pick)(
        evt,
        ["altKey", "ctrlKey", "metaKey", "shiftKey", "key"]
    );
    const keysString = rearrange(
        getPressedKeysString(pressedObj, pressedObj.key)
    );
    const _isPressed = (0, import_lodash.includes)(_keys, keysString) && _fn(evt);
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
  const specialKeyString = (0, import_lodash.reduce)(
      (0, import_lodash.pickBy)(obj),
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
  return (0, import_lodash.sortBy)(
      `${str}`.toLowerCase().replace(/ /g, "").split("+")
  ).join("+");
};
const hasEl = (evt, domQuerySelectorOrFunc) => !!document.activeElement.parentElement.querySelector(domQuerySelectorOrFunc);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useBackSpace,
  useCtrlEnter,
  useCtrlShiftWithKey,
  useCtrlWithKey,
  useShiftWithKey
});
