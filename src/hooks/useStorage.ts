import { useState } from 'react'

const getDefaultStorageValue = (key: string) => localStorage.getItem(key)

type ValueType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'map'
  | 'set'
  | 'date'
  | 'any'

const getFormatStrategyByValueType = (type: ValueType) => {
  const TypeStrategyMap = {
    string: {
      getter: (v: string) => v,
      setter: (v: any) => String(v)
    },
    number: {
      getter: (v: string) => Number(v),
      setter: (v: any) => String(v)
    },
    boolean: {
      getter: (v: string) => v === 'true',
      setter: (v: any) => String(v)
    },
    any: {
      getter: (v: any) => v,
      setter: (v: any) => String(v)
    },
    object: {
      getter: (v: string) => JSON.parse(v),
      setter: (v: any) => JSON.stringify(v)
    },
    map: {
      getter: (v: string) => new Map(JSON.parse(v)),
      setter: (v: any) => JSON.stringify(Array.from(v.entries()))
    },
    set: {
      getter: (v: string) => new Set(JSON.parse(v)),
      setter: (v: any) => JSON.stringify(Array.from(v.values()))
    },
    date: {
      getter: (v: string) => new Date(Number(v)),
      setter: (v: any) => String(v.getTime())
    }
  }

  return TypeStrategyMap[type || 'any']
}

export function useStorage(key: string, type: ValueType, defaultVal?: any) {
  const { getter, setter } = getFormatStrategyByValueType(type)

  const defStorageVal = getDefaultStorageValue(key)

  let useStateDefVal
  try {
    useStateDefVal = defStorageVal ? getter(defStorageVal) : defaultVal
  } catch {
    useStateDefVal = defaultVal
  }

  const [storedValue, setStoredValue] = useState(useStateDefVal)

  const setStorageValue = (value: any) => {
    localStorage.setItem(key, setter(value))
    if (storedValue !== value) {
      setStoredValue(value)
    }
  }

  const removeStorage = () => {
    localStorage.removeItem(key)
  }
  return [storedValue, setStorageValue, removeStorage]
}
