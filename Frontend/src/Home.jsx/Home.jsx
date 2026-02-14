import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Freebook from '../components/Freebook'
import Footer from '../components/Footer'
import Prism from '../components/Prism'

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Prism Background Wrapper for Banner */}
      <div style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden' }}>

        {/* The Prism Effect (Background) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0}
            glow={1}
          />
        </div>

        {/* The Banner Content (Foreground) */}
        <div style={{ position: 'relative', zIndex: 10, height: '100%' }}>
          <Banner />
        </div>

      </div>

      <Freebook />
      <Footer />
    </>
  )
}

export default Home