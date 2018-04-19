import * as React from 'react' 
import { extractClasses, PicnicProps, getId, onEscape, addClasses, isNotJSX, isJSX } from './utils'
import { Toggler, TogglerProps } from './Toggler'

export const ModalTrigger = ({ children, isOpen, label, ...props }:PicnicProps & {isOpen?:boolean}) => (
  <label {...(props as any)} >{label}{children}</label>
)

export const ModalWindow = (_props:PicnicProps) => {
  const { id, footer, className, label, isOpen, checkboxRef, close, title, children, ...props  } = extractClasses(_props)
  return (
    <div className={'modal '+className}>
      <input id={id} type="checkbox" ref={checkboxRef} checked={isOpen}/>
      <ModalTrigger className="overlay dada" htmlFor={id} isOpen={isOpen} onClick={close}/>
      <article>
        {title && 
        <header>
          { isNotJSX(title)
          ? <h3>{title}</h3>
          : title
          }
        </header>
        }
        <ModalTrigger className="close" htmlFor={id} onClick={close} label={label || '×'} isOpen={isOpen}/>
        <section className="content">
          {children}
        </section>
        <footer>
          {footer}
        </footer>
      </article>
    </div>
  ) 
}

export interface ModalProps extends PicnicProps
  {}

export const Modal = (_props:ModalProps & TogglerProps) => {
  ; const { onOpen, onClose, onTrigger, isOpen } = _props
  ; const togglerProps = { onOpen, onClose, onTrigger, isOpen }
  ; const {id:_id, footer, className, closeLabel, label:_label, checkboxRef, title, children } = _props
  ; const id = _id || 'modal-'+getId()
  ; const label = isJSX(_label) ? _label : <button>{_label}</button>
  return (
    <Toggler {...togglerProps}>
      { ({ isOpen:_isOpen, open, close, toggle }) => (
          <>
            <ModalTrigger {...{htmlFor:id, onClick:toggle, label, isOpen:_isOpen}}/>
            <ModalWindow {...{ close, id, label:closeLabel, footer, className, checkboxRef, title, children, isOpen:_isOpen }}/>
          </>
      )}
    </Toggler>
  )
}

export default Modal