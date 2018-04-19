import * as React from 'react' 
import { extractClasses, PicnicProps } from './utils'

export const Radio = (_props:PicnicProps) => {
  const { name, label, onChange, onClick, checked, className, ...props } = extractClasses(_props)
  return (
    <label {...props} className={className}>
      <input type="radio" name={name} onChange={onChange} checked={checked}/>
      <span className="checkable" onClick={onClick}>{label}</span>
    </label>
  )
}

export default Radio