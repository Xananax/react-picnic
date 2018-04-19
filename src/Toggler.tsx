import * as React from 'react'
import { Omit } from './utils'

export interface TogglerPassedProps
  { onOpen?:  (open:boolean) => void
  ; onClose?: (open:boolean) => void
  ; onToggle?:(open:boolean) => void
  ; children: (props:TogglerRenderProps) => JSX.Element
  ; isOpen?:boolean
  }

export type TogglerProps = Omit<TogglerPassedProps,'children'>

export interface TogglerState
  { isOpen:boolean
  }

export interface TogglerRenderProps
  { isOpen:boolean
  ; open: () => void
  ; close: () => void
  ; toggle: () => void
  }

export class Toggler extends React.Component<TogglerPassedProps, TogglerState>{
  static getDerivedStateFromProps(nextProps:TogglerPassedProps, prevState:TogglerState)
  { if('isOpen' in nextProps && typeof nextProps.isOpen !== 'undefined' && nextProps.isOpen !== prevState.isOpen)
    { return { isOpen:nextProps.isOpen }
    }
  ; return null
  }
  constructor(props:TogglerPassedProps,context:any)
  { super(props,context)
  ; this.state = { isOpen: props.isOpen || false }
  }
  open = () =>
  { this.setState({isOpen:true})
  ; if(this.props.onOpen){ this.props.onOpen(this.state.isOpen) }
  ; if(this.props.onToggle){ this.props.onToggle(this.state.isOpen) }
  }
  close = () =>
  { this.setState({isOpen:false})
  ; if(this.props.onClose){ this.props.onClose(this.state.isOpen) }
  ; if(this.props.onToggle){ this.props.onToggle(this.state.isOpen) }
  }
  toggle = () =>
  { if(this.state.isOpen)
    { this.close() 
    ; return
    }
  ; this.open()
  }
  render()
  { const { isOpen } = this.state
  ; const { children, ...rest } = this.props
  ; const { open, close, toggle } = this
  ; const props = { isOpen, open, close, toggle, ...rest }
  ; return children(props)
  }
}

export default Toggler