import * as React from 'react'
import { extractClasses, PicnicProps, classnames } from './utils'

export const Checkable = (_props:PicnicProps & {childClassName?:string}) => {
  const { children, defaultChecked, checked, className, onChange, onClick, childClassName, ...props } = extractClasses(_props,'checkable-container')
  return (
  <label className={className}>
    <input onChange={onChange} type="checkbox" checked={checked} defaultChecked={defaultChecked}/>
    <span onClick={onClick} className={classnames('checkable',childClassName)}>{children}</span>
  </label>
)}

export default Checkable