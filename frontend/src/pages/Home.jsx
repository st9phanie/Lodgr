import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestinations from '../components/FeaturedDestinations'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <>
        <Hero />
        <FeaturedDestinations />
        <ExclusiveOffers />
        <Testimonials />
        <Newsletter />
    </>
  )
}

export default Home