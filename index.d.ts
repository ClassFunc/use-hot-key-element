/// <reference types="react" />
export default function useHotKey(keys: any, domQuerySelectorOrFunc: any): (boolean | import("react").Dispatch<import("react").SetStateAction<boolean>>)[];
declare const useCtrlWithKey: (key: string, domQuerySelectorOrFunc: any) => (boolean | import("react").Dispatch<import("react").SetStateAction<boolean>>)[];
declare const useShiftWithKey: (key: string, domQuerySelectorOrFunc: any) => (boolean | import("react").Dispatch<import("react").SetStateAction<boolean>>)[];
declare const useCtrlShiftWithKey: (key: any, domQuerySelectorOrFunc: any) => (boolean | import("react").Dispatch<import("react").SetStateAction<boolean>>)[];
declare const useCtrlEnter: (domQuerySelectorOrFunc: any) => (boolean | import("react").Dispatch<import("react").SetStateAction<boolean>>)[];
declare const useBackSpace: (domQuerySelectorOrFunc: any) => (boolean | import("react").Dispatch<import("react").SetStateAction<boolean>>)[];
export { useCtrlWithKey, useShiftWithKey, useCtrlShiftWithKey, useCtrlEnter, useBackSpace, };
