### Tại sao?
- [useKeyboardJs](https://github.com/streamich/react-use/blob/master/docs/useKeyboardJs.md) không giải quyết được vấn đề sử dụng phím tắt hoặc tổ hợp phím tắt với một html element cụ thể (ví dụ một textfield có id `#input-textfield`).
- Thao tác với phím tắt luôn tuyệt vời hơn click chuột.

### Cài đặt:
```sh
npm i -S use-hot-key-element
hoặc
yarn add use-hot-key-element
```

### Sử dụng: 

```js
import React, {useEffect, useState} from 'react'
import useHotKey from 'use-hot-key-element'

function Form(){
  const [name, setName] = useState('')
  
  const [isNameInputEnterPressed] = useHotKey('enter', '#name-input')//khi nhấn phím enter trên element có id `name-input`
  
  useEffect(()=>{
    if(isNameInputEnterPressed) console.log(name) // log name khi enter trên `name-input`
  },[isNameInputEnterPressed])
  
  return (
    <div>
      <input id="name-input" value={name} onchange={(e)=>setName(e.target.value)}/>
    </div>
  )
}

```

### API:
- useHotKey`(keys: String|Array, domQuerySelectorOrFunc: String|Function)`
- useCtrlWithKey`(key: String, domQuerySelectorOrFunc: String|Function)`
- useShiftWithKey`(key: String, domQuerySelectorOrFunc: String|Function)`
- useCtrlShiftWithKey`(key: String, domQuerySelectorOrFunc: String|Function)`
- useCtrlEnter`(domQuerySelectorOrFunc: String|Function)`
- useBackSpace`(domQuerySelectorOrFunc: String|Function)`

> Trong đó:
- `key` là 1 tổ hợp phím hoặc 1 phím, ví dụ: `'z'`, `'ctrl+c'`, `'shift+enter'`, `'shift+meta+v'(cho mac)`. Các phím đặc biệt bao gồm `ctrl`(Mac: phím `control` hoặc `command`),`alt`(Mac: phím `option`), `shift`.
- `keys` là một mảng của `key` sử dụng trong trường hợp lắng nghe nhiều `key` khác nhau, hoặc 1 `key`
- `domQuerySelectorOrFunc` là [selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) của element, hoặc 1 function được thực hiện khi nhấn `key`

### License:
MIT

### Author:
[ClassFunc](https://classfunc.com)





