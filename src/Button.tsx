import * as React from 'react' 
import { extractClasses, PicnicProps } from './utils'

export const Button = (_props:PicnicProps) => {
  const props = extractClasses(_props)
  return <button {...props}/>
} 
export default Button