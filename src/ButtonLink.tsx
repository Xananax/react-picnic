import * as React from 'react' 
import { extractClasses, PicnicProps } from './utils'

export const ButtonLink = (_props:PicnicProps) => {
  const props = extractClasses(_props,'button')
  return <a {...props}/>
} 
export default ButtonLink