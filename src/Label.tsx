import * as React from 'react' 
import { extractClasses, PicnicProps } from './utils'

export const Label = (_props:PicnicProps) => {
  const props = extractClasses(_props,'label')
  return <label {...props}/>
} 

export default Label