import * as React from 'react'
import { extractClasses, PicnicProps, addClasses } from './utils'
import { Checkable } from './Checkable'

export const Checkbox = (_props:PicnicProps) => {
  const props = addClasses(_props,'checkable')
  return (
    <Checkable {...props}/>
  )
}

export default Checkbox