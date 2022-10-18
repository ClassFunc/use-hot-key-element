import {useEffect, useState} from 'react';
import {includes, isString, pick, pickBy, reduce, sortBy} from 'lodash';

const dfn: (evt: boolean) => boolean = () => {
    return true;
};

export default function useHotKey(keys: any = [], domQuerySelectorOrFunc: any) {

    const [isPressed, setIsPressed] = useState(false);

    const _keys = (isString(keys) ? [keys] : keys).map((k: string) => rearrange(k));
    let _fn = dfn;
    if (isString(domQuerySelectorOrFunc)) {
        _fn = (evt) => hasEl(evt, domQuerySelectorOrFunc);
    }

    useEffect(() => {
        document.addEventListener('keydown', handlePress);
        return () => {
            document.removeEventListener('keydown', handlePress);
        };
    }, []);

    const handlePress = (evt: any) => {
        evt = evt || (window as any).event;
        if (!evt)
            return;
        const pressedObj = pick(evt,
            ['altKey', 'ctrlKey', 'metaKey', 'shiftKey', 'key']);
        const keysString = rearrange(
            getPressedKeysString(pressedObj, pressedObj.key));//ex: meta+shift+enter
        const _isPressed = includes(_keys, keysString) && _fn(evt);
        setIsPressed(_isPressed);
    };

    return [isPressed, setIsPressed];
}

const useCtrlWithKey = (key: string, domQuerySelectorOrFunc: any) => {
    return useHotKey([`ctrl+${key}`, `meta+${key}`], domQuerySelectorOrFunc);
};
const useShiftWithKey = (key: string, domQuerySelectorOrFunc: any) => {
    return useHotKey(`shift+${key}`, domQuerySelectorOrFunc);
};

const useCtrlShiftWithKey = (key: any, domQuerySelectorOrFunc: any) => {
    return useCtrlWithKey(`shift+${key}`, domQuerySelectorOrFunc);
};
const useCtrlEnter = (domQuerySelectorOrFunc: any) => {
    return useCtrlWithKey('enter', domQuerySelectorOrFunc);
};
const useBackSpace = (domQuerySelectorOrFunc: any) => {
    return useHotKey(['backspace', 'delete'], domQuerySelectorOrFunc);
};

export {
    useCtrlWithKey,
    useShiftWithKey,
    useCtrlShiftWithKey,
    useCtrlEnter,
    useBackSpace,
};

//helpers
const getPressedKeysString = (obj: Pick<any, "altKey" | "ctrlKey" | "metaKey" | "shiftKey" | "key">, mainKey: string) => {
    const specialKeyString = reduce(
        pickBy(obj),
        (res, v, k) => {
            if (`${k}`.includes('Key'))
                res += `${k}`.replace('Key', '') + '+';
            return res;
        }, '');
    return specialKeyString + mainKey;
};

const rearrange = (str: string) => {
    return sortBy(
        `${str}`.toLowerCase().replace(/ /g, '').split('+'),
    ).join('+');
};

const hasEl = (evt: boolean, domQuerySelectorOrFunc: string) =>
    !!(document as any).activeElement.parentElement.querySelector(domQuerySelectorOrFunc);
