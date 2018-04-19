import * as React from 'react' 
import { Children } from 'react'
import { extractClasses, classnames, PicnicProps, getId, numToWord, isNotJSX } from './utils'

export interface TabLinkProps extends PicnicProps
  { name:string
  }

export const TabLink = ({ id='tab-'+getId(), name, checked, className, label, value, onChange, defaultChecked }:TabLinkProps) => {  
  return (
    <>
      <input id={id} type="radio" onChange={onChange} value={value} name={name} checked={checked} defaultChecked={defaultChecked}/>
      <label className={className} htmlFor={id}>{label}</label>
    </>
  )
}

export interface TabHeaderProps extends TabLinkProps
  { tabs:{ label:any, id?:string, alt?:string, title?:string }[]
  }

export const TabHeader = ({ name, value:selected, button, className:_className ,pseudo, onChange, tabs, ...props }:TabHeaderProps) => 
  { const tabsExternallyHandled = typeof selected!=='undefined' && typeof onChange !== 'undefined' 
  ; const className = classnames({ pseudo }, button && 'button toggle',_className,)
  ; const renderedTabs = tabs.map( (item,index) => 
    { const id = 'toggle-'+(item.id ? item.id : 'tab-'+index)
    ; const checked = tabsExternallyHandled ? selected === index : undefined
    ; const defaultChecked = tabsExternallyHandled ? undefined : index === 0
    ; const value = index
    ; const label = item.label || item.title || item.alt || index
    ; const tabLinkProps = { id, name, checked, defaultChecked, value, label, onChange, className, ...props} 
    ; return <TabLink key={id} {...tabLinkProps}/>
    })
  ; return (<>{renderedTabs}</>)
  }

export interface TabsInterface extends PicnicProps
  { children:React.ReactNode[]
  ; button:boolean
  ; paneStyle:React.CSSProperties
  ; labels:JSX.Element[]
  }

// tslint:disable-next-line:max-line-length
export const Tabs = ({ children, className, labels, title, paneStyle, button, childrenClasses, name, pseudo=true, value:selected, onChange, ...props }:PicnicProps) => {
  const count = Children.count(children)
  const wordNum = numToWord(count)
  return (
    <div className={classnames('tabs',wordNum,className)} {...props}>
      {labels}
      <div className="row" style={paneStyle}>
        {children}
      </div>
    </div>
  )
}

export default Tabs