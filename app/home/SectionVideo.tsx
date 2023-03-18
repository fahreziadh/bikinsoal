"use client"
import React from 'react'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const SectionVideo = () => {
  return (
    <ReactPlayer
      autoplay={true}
      muted={true}
      controls={false}
      loop={true}
      playing={true}
      url='https://www.youtube.com/watch?v=hAP2QF--2Dg'
      width={"100%"}
      height={"100%"}
      style={{ objectFit: 'fill',aspectRatio: '16/9', marginTop: '80px', borderRadius: '10px', }}
    />
  )
}

export default SectionVideo