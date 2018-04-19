import * as React from 'react'
import { extractClasses, PicnicProps } from './utils'

export const Card = (_props:PicnicProps) => {
  const {className, children, title, ...props} = extractClasses(_props,'card')
  return (
  <article className={className}>
    <header>
      {title && <h3>{title}</h3>}
    </header>
    <footer>
      {children}
    </footer>
  </article>
  )
}

export default Card