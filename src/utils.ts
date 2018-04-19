import * as React from 'react'
import { createElement } from 'react'
import * as classnames from 'classnames'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type ModifiedAttributes = Omit<React.AllHTMLAttributes<any>,'label'|'title'>

export interface PicnicProps extends ModifiedAttributes
  { stack?:boolean
  ; success?:boolean
  ; warning?:boolean
  ; error?:boolean
  ; pseudo?:boolean
  ; children?:React.ReactNode | React.ReactNode[] | Element
  ; label?: string | number | JSX.Element
  ; title?: string | number | JSX.Element
  ; [key:string]:any
}

declare module 'react'
{ interface HTMLAttributes<T>
  { label?: string | number | JSX.Element
  }
}

export const extractClasses = 
  <T extends PicnicProps>
  ({ className, stack, success, warning, error, pseudo, ...props }:PicnicProps, additionalClassName?:string):T => 
  ({ className: classnames({ stack, success, warning, error, pseudo }, className, additionalClassName) || undefined, ...props} as T)

export const createPicnicElement = 
  (name:string, type:string, className:string,props:PicnicProps) => 
  { const _props = { ...extractClasses(props,className) }
  //  ; console.log(name,'',_props)
  ; return createElement(type,_props)
  }

export const Picnic = (name:string, type:string, className:string = name.toLowerCase()) => {
  const Element = (props:PicnicProps) => createPicnicElement(name,type,className,props)
  // tslint:disable-next-line:no-string-literal
  Element['displayName'] = name
  return Element;
}

export const addToStringProperty = 
  <T extends PicnicProps>(key:string) => 
  (props:T, ...additionalClassNames:(string|string[])[]):T => 
  { const className = props[key] || ''
  ; if(!className && !additionalClassNames.length){ return props }
  ; return { ...(props as any), [key]:classnames( className as string, additionalClassNames)}
  }

export const fileListToArray = (files:FileList,multiple:boolean):File[] => {
  return Array.prototype.slice.call(files, 0, multiple ? undefined : 1)
}

export const addClasses = addToStringProperty('className')
export const addChildClasses = addToStringProperty('childClassName')

export const readFileLater = (file:File) => {
  
  const reader = new FileReader()

  type FilePromise<T> = Promise<File & {contents:T}>

  const get = <T>( run:()=>void ) => ():FilePromise<T> => new Promise((resolve, reject) => {
    reader.onloadend = () => {
      const contents = reader.result as T
      const _file = { ...file, contents }
      return resolve(_file)
    }
    reader.onerror = reject
    run()
  })

  const asDataURL = get<string>(reader.readAsDataURL.bind(reader, file))
  const methods = {
    asBinaryString: get<string>(reader.readAsBinaryString.bind(reader, file)),
    asDataURL,
    asText: get<string>(reader.readAsText.bind(reader, file)),
    asArrayBuffer: get<ArrayBuffer>(reader.readAsArrayBuffer.bind(reader, file))
  }

  return Object.assign(asDataURL, methods )
}

const augmentFile = (file:File) => ({ ...file, getContents:readFileLater(file) })

export type AugmentedFile = ReturnType<typeof augmentFile>

const augmentFileArray = (files:File[]) => files.map(augmentFile)

const augmentFileList = (files:FileList,multiple:boolean) => augmentFileArray(fileListToArray(files,multiple))

export interface HTMLFileInputElement extends HTMLInputElement
  { files:FileList
  ; multiple:boolean
  }

export const getInputFiles = (input:HTMLFileInputElement) => augmentFileList(input.files,input.multiple)

export const getId = ( () => {
  let ids = 0
  return () => ids++
})()

export const onKeyDown = (() => {

  type Listener = (key:number)=>void

  let hasBeenSetup = false;
  const listeners:{[key:number]:Listener[]} = {}

  const onDocKeyDown = ({keyCode}:KeyboardEvent) => {
    listeners[keyCode] && listeners[keyCode].forEach(listener=>listener(keyCode));
  }

  const countListeners = () =>
  Object.keys(listeners).reduce((n,_listeners)=>_listeners.length+n,0)
  
  const cleanUpIfNoListeners = () => 
  { const count = countListeners()
  ; if(!count)
    { document.removeEventListener('keydown',onDocKeyDown)
    ; hasBeenSetup = false
    }
  }
  
  const removeListener = (key:number, listener:Listener) => {
    if(!listeners[key]){ return; }
    const index = listeners[key].indexOf(listener)
    if(index>=0){ listeners[key].splice( index,1 )}
    if(!listeners[key].length)
    { cleanUpIfNoListeners()
    }
  }

  const startIfNotStarted = () => 
  { if(!hasBeenSetup)
    { hasBeenSetup = true
    ; document.addEventListener('keydown',onDocKeyDown)
    }
  }

  const addListener = (key:number) => (listener:Listener) => {
    listeners[key] = listeners[key] || []
    listeners[key].push(listener)
    return removeListener.bind(null,key,listener)
  }
  return addListener
})()

export const onEscape = onKeyDown(27)

export const isNotJSX = (obj:any):obj is string | number => (typeof obj === 'string' || typeof obj === 'number')

export const isJSX = (obj:any) => !isNotJSX(obj)

export const numToWord = (()=>{
  const numbersAsText = ['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve']
  return (num:number) => numbersAsText[num]
})()

export { createElement, classnames }