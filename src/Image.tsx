import * as React from 'react'
import { classnames } from './utils';

type Origin = string|'border'|'padding'|'content'

export interface ImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
  { fixed?:boolean
  ; scroll?:boolean
  ; attachment?:'fixed'|'scroll'
  ; clip?:Origin|'text'
  ; color?:string
  ; src?:string
  ; image?:string
  ; origin?:Origin
  ; position?:string
  ; repeat?:boolean|string|'x'|'repeat-x'|'y'|'repeat-y'|'space'|'round'|'no'|'no-repeat'|'repeat'|'yes'
  ; cover?:boolean
  ; contain?:boolean
  ; size?:number|string
  ; width?:number|string
  ; height?:number|string
  ; crop?:boolean
  ; weight?:string|'n'|'north'|'s'|'south'|'e'|'east'|'w'|'west'|'nw'|'northwest'|'ne'|'northeast'|'sw'|'southwest'|'se'|'southeast'|'c'|'center'
  }

export const extractStyle = (props:ImageProps) =>
  { const 
    { fixed
    , scroll
    , attachment
    , clip
    , color
    , src
    , image
    , origin
    , position
    , repeat
    , cover
    , contain
    , size
    , width
    , height
    , crop
    , weight
    , ...rest
    } = props
  ; const style:React.CSSProperties = {}
  ; if(fixed){ style.backgroundAttachment = 'fixed' }
    else if(scroll){ style.backgroundAttachment = 'scroll' }
    else if(attachment){ style.backgroundAttachment = attachment }
  ; if( typeof clip !== 'undefined' ){ style.backgroundClip = clip==='text' ? 'text':`${clip}-box`}
  ; if( typeof color !== 'undefined' ){ style.backgroundColor = color}
  ; if( typeof src !== 'undefined' ){ style.backgroundImage = `url("${src}")`}
  ; if( typeof image !== 'undefined' ){ style.backgroundImage = image}
  ; if( typeof origin !== 'undefined' ){ style.backgroundOrigin = `${origin}-box`}
  ; if( typeof weight !== 'undefined' )
    { switch(weight)
      { case 'n':
        case 'north':
        style.backgroundPosition = 'top 25% center';break
      ; case 's':
        case 'south':
        style.backgroundPosition = 'bottom 25% center';break
      ; case 'w':
        case 'west':
        style.backgroundPosition = 'center left 25%';break
      ; case 'e':
        case 'east':
        style.backgroundPosition = 'center right 25%';break
      ; case 'ne':
        case 'northeast':
        style.backgroundPosition = 'top 25% right 25%';break
      ; case 'nw':
        case 'northwest':
        style.backgroundPosition = 'top 25% left 25%';break
      ; case 'se':
        case 'southeast':
        style.backgroundPosition = 'bottom 25% right 25%';break
      ; case 'sw':
        case 'southwest':
        style.backgroundPosition = 'bottom 25% left 25%';break
      ; default:
        style.backgroundPosition = 'center center';break
      }
    }
  ; if( typeof position !== 'undefined' ){ style.backgroundPosition = position}
  ; if( typeof repeat !== 'undefined' )
    { switch(repeat)
      { case false:
        case 'no':
        case 'no-repeat':
          style.backgroundRepeat = 'no-repeat';break
      ; case true:
        case 'repeat':
        case 'yes':
          style.backgroundRepeat = 'repeat';break
      ; case 'repeat-x':
        case 'x':
          style.backgroundRepeat = 'repeat-x';break
      ; case 'repeat-y':
        case 'y':
          style.backgroundRepeat = 'repeat-y';break
      ; case 'space':
          style.backgroundRepeat = 'space';break
      ; case 'round':
          style.backgroundRepeat = 'round';break
      ; default: break;
      }
    }
  ; if( typeof cover !== 'undefined' ){ style.backgroundSize = 'cover' }
  ; if( typeof contain !== 'undefined' ){ style.backgroundSize = 'contain' }
  ; if( typeof size !== 'undefined' ){ style.backgroundSize = size }
  ; if( typeof width !== 'undefined' ){ style.width = width }
  ; if( typeof height !== 'undefined' ){ style.height = height }
  ; if(crop){ style.overflow = 'hidden' }
  ; const _style = { ...style, display:'inline-block', ...props.style}
  ; return { ...props, style:_style }
  }

export const Image = (props:ImageProps) => 
  { const { src, style, alt, height, width, className, crossOrigin, children, label, ...rest } = extractStyle(props)
  ; return (
      <div style={style} title={alt} label={label} className={classnames('background-image',className)}>
        <img src={src} alt={alt} height={height} width={width} crossOrigin={crossOrigin} style={{visibility:'hidden'}}/>
        {children}
      </div>
    )
  }