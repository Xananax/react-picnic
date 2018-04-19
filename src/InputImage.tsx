import * as React from 'react'
import { extractClasses, PicnicProps, addClasses } from './utils'

export const InputImage = ( _props:PicnicProps & {src?:string}) => {
  const { className, label, src, children, style:_style } = extractClasses(_props,'dropimage-container') 
  const style = src ? { backgroundImage:`url("${src}")`, ..._style || {} } : _style 
  return (
  <div className={className}>
    <label style={style} className="dropimage">
      <input title={label} type="file"/>
    </label>
    {children}
  </div>
  )
}

export default InputImage
