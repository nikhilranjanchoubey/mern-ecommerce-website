import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div className="my-10">

      {/* About Us Title */}
      <div className="text-2xl text-center mb-12">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Section */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-20">

        {/* Image */}
        <img
          className="w-full lg:w-1/2 max-w-[550px] object-cover"
          src={assets.about_img}
          alt="About Forever"
        />

        {/* Content */}
        <div className="flex flex-col gap-6 text-gray-600 text-sm sm:text-base leading-7">

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

          <div>
            <p className="text-gray-800 mb-3">
              Our Mission
            </p>

            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>

        </div>

      </div>


      {/* Why Choose Us */}
      <div className="mb-20">

        <div className="text-xl py-4 mb-4">
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">

          {/* Quality */}
          <div className="border border-gray-200 px-8 md:px-12 py-10 md:py-16 flex flex-col gap-5">
            <p className="text-gray-800">
              Quality Assurance:
            </p>

            <p className="text-gray-600 leading-6">
              We meticulously select and vet each product to ensure it meets
              our stringent quality standards.
            </p>
          </div>

          {/* Convenience */}
          <div className="border border-gray-200 px-8 md:px-12 py-10 md:py-16 flex flex-col gap-5">
            <p className="text-gray-800">
              Convenience:
            </p>

            <p className="text-gray-600 leading-6">
              With our user-friendly interface and hassle-free ordering
              process, shopping has never been easier.
            </p>
          </div>

          {/* Customer Service */}
          <div className="border border-gray-200 px-8 md:px-12 py-10 md:py-16 flex flex-col gap-5">
            <p className="text-gray-800">
              Exceptional Customer Service:
            </p>

            <p className="text-gray-600 leading-6">
              Our team of dedicated professionals is here to assist you every
              step of the way, ensuring your satisfaction is our top priority.
            </p>
          </div>

        </div>

      </div>


      {/* Newsletter */}
      <NewsletterBox />

    </div>
  )
}

export default About