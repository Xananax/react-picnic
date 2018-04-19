import * as React from 'react'
import { render } from 'react-dom'

import { Button } from '../Button'
import { ButtonLink } from '../ButtonLink'
import { ButtonToggle } from '../ButtonToggle'
import { Card } from '../Card'
import { Checkable } from '../Checkable'
import { Checkbox } from '../Checkbox'
import { DropImage } from '../DropImage'
import { Flex } from '../Flex'
import { Image } from '../Image'
import { InputImage } from '../InputImage'
import { Label } from '../Label'
import { Modal } from '../Modal'
import { Nav } from '../Nav'
import { Radio } from '../Radio'
import { Tabs, TabHeader } from '../Tabs'
import { Toggler } from '../Toggler'
import './index.css'

const assets = require('./files.json')

const signature = require('./images/signature.jpg')

const authorCaption = (author?:string) => author ? `photo by ${author}, courtesy of usplash` : ''

const images = 
  [ { author:'Bogdan Dada',         weight:'c', src:require('./images/unsplash/bogdan-dada-156739-unsplash.jpg') }
  , { author:'Chris barbalis',      weight:'c', src:require('./images/unsplash/chris-barbalis-186421-unsplash.jpg') }
  , { author:'Chris barbalis',      weight:'c', src:require('./images/unsplash/chris-barbalis-348804-unsplash.jpg') }
  , { author:'Oliver Cole',         weight:'c', src:require('./images/unsplash/oliver-cole-245712-unsplash.jpg') }
//  , { author:'Toa Heftiba',         weight:'c', src:require('./images/toa-heftiba-417510-unsplash.jpg') }
// , { author:'Vincent Van Zalinge', weight:'se', src:require('./images/vincent-van-zalinge-390731-unsplash.jpg') }
  ].map(image =>({...image,key:image.src,label:authorCaption(image.author)}))

const Thumbnail = ({author,src,weight,label}:{author?:string,src?:string,weight?:string,label:string}) => (
  <Image src={src} alt={label} width={100} height={100} cover crop weight={weight}>
    <span>a phot</span>
  </Image>
)

const Slide = (props:{author?:string,src?:string,weight?:string,label:any}) => {
  const {author,src,weight,label} = props
  return (
    <Image src={src} alt={label} width={`100%`} height={`100%`} contain weight="center" repeat={false} style={{position:'relative'}}>
      <div style={{position:'absolute',bottom:0, left:0,right:0,padding:`1em`,background:'rgba(0,0,0,.2)'}}>a photo</div>
    </Image>
  )
}

class App extends React.Component{
  render()
  { const tabs = images.map((image,index)=>({...image,label:<Thumbnail {...image}/>}))
  ; return (
    <>
      <header>
        <div className="hero">
          <Image src={signature} crop/>
        </div>
        <Nav title="" className="header" url="/" logo={signature}>
          <ButtonLink pseudo>Home</ButtonLink>
          <ButtonLink pseudo>Galleries</ButtonLink>
          <ButtonLink pseudo>Events</ButtonLink>
          <ButtonLink pseudo>About</ButtonLink>
        </Nav>
      </header>
      <div style={{marginTop:80}}>
        <Flex three style={{marginTop:80}}>
            <div>dsfsd</div>
            <div>dsfsd</div>
            <div>dsfsd</div>
            <div>dsfsd</div>
        </Flex>
      </div>
    </>
    )
  }
}

const mountPoint = document.getElementById('root')

render( <App />, mountPoint )
