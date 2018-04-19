import * as React from 'react'
import { extractClasses, PicnicProps, addClasses, HTMLFileInputElement, AugmentedFile } from './utils'
import { InputImage } from './InputImage'
import { getInputFiles } from './utils'

export interface DropImageProps extends PicnicProps{
  multiple?:boolean,
  onFiles?:(files:AugmentedFile[], value:string) => void
  onFile?:(file:AugmentedFile, value:string) => void
}

export class DropImage extends React.Component<DropImageProps>{
  shouldDispatch(){
    return (
      (this.props.multiple && this.props.onFiles) ||
      (!this.props.multiple && this.props.onFile)
    )
  }
  onChange = (evt:React.ChangeEvent<HTMLFileInputElement>) => 
  { const input = evt.target
  ; const { multiple } = input
  ; const value = input.value
  ; const files = getInputFiles(input)
  ; if(files.length)
    { if(this.props.onFiles && multiple)
      { this.props.onFiles(files,value)
      }
      else if(this.props.onFile && !multiple)
      { this.props.onFile(files[0],value)
      }
    }
  ; if(this.props.onChange)
    { this.props.onChange(evt)
    }
  }
  render ( ){
    const props = this.shouldDispatch() ? { ...this.props, onChange:this.onChange } : this.props
    return <InputImage {...props}/>
  }
}

export default DropImage