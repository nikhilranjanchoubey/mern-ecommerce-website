import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
   <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

  <img
    className="w-full max-w-[450px] mx-auto"
    src={assets.about_img}
    alt="About"
  />

  <div className="flex flex-col justify-center gap-6 text-gray-600">
    <p>
      Forever was born out of a passion for innovation and a desire to
      revolutionize the way people shop online. Our journey began with a
      simple idea: to provide a platform where customers can easily
      discover, explore, and purchase a wide range of products from the
      comfort of their homes.
    </p>

    <p>
      Since our inception, we've worked tirelessly to curate a diverse
      selection of high-quality products that cater to every taste and
      preference. From fashion and beauty to electronics and home
      essentials, we offer an extensive collection sourced from trusted
      brands and suppliers.
    </p>
  </div>

</div>
  )
}

export default About