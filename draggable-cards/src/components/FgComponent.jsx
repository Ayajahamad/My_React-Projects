import React, { useRef, useState } from 'react'
import Card from './Card';

const FgComponent = () => {

    const ref = useRef(null);

    const data = [
        {
            desc : "FileSize-.9mb With dowmload option With Green color",
            filesize : ".9mb",
            close : false,
            tag : {
                isOpen:true,
                tagTitle :"Download Now",
                tagColor: "green"
            }

            
        },
        {
            desc : "FileSize-.9mb With Close option With Blue color",
            filesize : ".9mb",
            close : true,
            tag : {
                isOpen:true,
                tagTitle :"Upload Now",
                tagColor: "blue"
            }

            
        },
        {
            desc : "FileSize-.9mb With dowmload option With No Footer",
            filesize : ".9mb",
            close : false,
            tag : {
                isOpen:false,
                tagTitle :"Download Now",
                tagColor: "green"
            }

            
        }
    ]
  return (
      <div ref={ref} className="fixed top-0 left-0 z-[3] w-full h-full flex gap-5 flex-wrap-wrap p-5">
        {
            data.map((item,index)=>(
                <Card data={item} reference={ref}/>
            ))
        }
      </div>
  )
}

export default FgComponent
