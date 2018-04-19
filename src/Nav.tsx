import * as React from 'react' 
import { extractClasses, PicnicProps, getId } from './utils'
import { Toggler, TogglerProps } from './Toggler'

export interface NavBrandProps
  { logo?:string
  ; title?:string
  ; url?:string 
  }

export const Brand = ({ logo, title, url }:NavBrandProps) => (
  <a href={url} className="brand">
    {logo && <img className="logo" src={logo} />}
    {title && <span>{title}</span>}
  </a>
)

export const NavBar = (_props:PicnicProps & NavBrandProps) => {
  const { logo, onClick, title, url, isOpen, label, children, className, id='nav-'+getId() } = _props
  return (
    <nav id={id} className={className}>
      {( logo || title ) && <Brand logo={logo} title={title} url={url}/>}

      <input id={id+'checkbox'} type="checkbox" className="show" checked={isOpen}/>
      <label htmlFor={id+'checkbox'} onClick={onClick} className="burger pseudo button">{label || '≡'}</label>

      <div className="menu">
        {children}
      </div>
    </nav>
  )
}

export const Nav = (_props:PicnicProps & NavBrandProps & TogglerProps ) => {
  const { onOpen, onClose, onToggle, isOpen, ...props } = _props
  const togglerProps = { onOpen, onClose, onToggle, isOpen }
  return (
    <Toggler {...togglerProps}>
      {({ isOpen:_isOpen, open, close, toggle }) => (
        <NavBar {...props} onClick={toggle} isOpen={_isOpen}/>
      )}
    </Toggler>
  )
}

export default Nav