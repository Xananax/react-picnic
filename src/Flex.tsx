import * as React from 'react' 
import { Children }from 'react'
import { PicnicProps, numToWord, classnames, extractClasses, isJSX, isNotJSX } from './utils'

export const screens = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(n=>(n*100)+'')

export const addSizes = (arr:string[]) => 
  arr.reduce((prev,element)=>[...prev,element,...screens.map(screen=>`${element}-${screen}`)],[])

export const buildIndex = (arr:string[]) =>
  { const obj:{[key:string]:string} = {}
  ; arr.forEach( snake => 
    { const camel = snake.replace(/-(w)/,'$1')
    ; obj[camel] = snake
    })
  ; return obj
  }

export const flexColumns = addSizes([1,2,3,4,5,6,7,8,9,10,12].map(numToWord))
export const remainder = ['grow','center']

export const flexParentPossibilities = buildIndex([...remainder, ...flexColumns])

export const sizes = addSizes(['full','half','third','two-third','fourth','three-fourth','fifth','two-fifth','three-fifth','four-fifth','sixth','none'])
export const offsets = sizes.map(size=>`off-${size}`)
export const flexChildrenPossibilities = buildIndex([...sizes,...offsets])

export const extractFlexClasses = (index:{[key:string]:string}) => <T extends PicnicProps>(props:T,additionalClasses?:string):T => 
  { const left:T = {} as T
  ; const classNames:string[] = []
  ; for(const n in props)
    { if(Object.hasOwnProperty.call(props,n))
      { if(props[n] && n in index)
        { classNames.push(index[n])
        }else
        { left[n] = props[n] 
        }
      }
    }
  ; if(classNames.length)
    { left.className = classnames(props.className, classNames,additionalClasses)
    ; return left
    }
  ; if(additionalClasses)
    { const className = classnames(props.className, additionalClasses)
    ; return { ...(props as any), className }
    }
  ; return props
  }

export const extractParentFlexClasses = extractFlexClasses(flexParentPossibilities)
export const extractChildrenFlexClasses = extractFlexClasses(flexChildrenPossibilities)

export interface GridProps extends PicnicProps
  { 
  }

export interface CellProps extends PicnicProps
  {}

export const Cell = (_props:CellProps) => 
  { const { children, ...props } = extractClasses(extractParentFlexClasses(_props),'flex-item')
  ; return <div {...props}>{children}</div>
  }

export const toCell = (child:React.ReactNode) => 
  { if(isNotJSX(child))
    { return <Cell>{child}</Cell>
    }
    if( 
      (child === null || typeof child === 'undefined') ||
      (typeof child === 'boolean') ||
      (!('props' in child))
    )
    { return child
    }
  ; const childProps = extractChildrenFlexClasses(child.props,'flex-item')
  ; if(childProps !== child.props)
    { const newChild = {...child, props:childProps }
    ; return newChild
    }
  ; return child
  }
 
export const Flex = (_props:GridProps) => 
  { const { children, ...props } = extractClasses(extractParentFlexClasses(_props),'flex')
  ; const _children = Children.map(children, toCell)
  ; return (
      <div {...props}>
        {_children}
      </div>
    )
  }

export default Flex