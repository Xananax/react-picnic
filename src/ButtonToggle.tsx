import * as React from 'react' 
import { extractClasses, addClasses, classnames, addChildClasses, PicnicProps } from './utils'
import { Checkable } from './Checkable'

export const ButtonToggle = (_props:PicnicProps) => {
  const { children, defaultChecked, checked, className, onChange, onClick, childClassName, ...props } = extractClasses(_props,'toggle-button-container')
  return (
  <label className={className}>
    <input onChange={onChange} type="checkbox" checked={checked} defaultChecked={defaultChecked}/>
    <span onClick={onClick} className={classnames('toggle button',childClassName)}>{children}</span>
  </label>)
} 
export default ButtonToggle