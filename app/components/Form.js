// app/components/Form.js

'use client'

import { useRef, useState } from 'react'
import InputWrapper from './InputWrapper'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function createWhatsAppUrl(whatsappNumber, message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

const Form = () => {
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    occupation: '',
    location: '',
    faith: '',
    children: '',
    aboutYou: '',
    mpesaCode: '',
    lookingFor: '',
  })

  const sliderRef = useRef(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isFormComplete(formData)) {
      toast.error('Please fill out all required fields.')
      return
    }

    setLoading(true)

    // Submit the form to the API
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        if (result.url) {
          window.open(result.url)
          toast.success('Your profile has been registered successfully!', {
            autoClose: false,
          })
          setFormData({
            names: '',
            email: '',
            phone: '',
            gender: '',
            age: '',
            occupation: '',
            location: '',
            faith: '',
            children: '',
            aboutYou: '',
            mpesaCode: '',
            lookingFor: '',
          })
          // reset slick slider back to first item
          sliderRef.current.slickGoTo(0)
          document.getElementById('section').scrollTo(0, 0)
        } else {
          const whatsappNumber = process.env.WHATSAPP_NUMBER

          const message = `*Name:* ${formData.names}\n*Email:* ${formData.email}\n*Phone Number:* ${formData.phone}\n*Gender:* ${formData.gender}\n*Age:* ${formData.age}\n*Occupation:* ${formData.occupation}\n*Location:* ${formData.location}\n*Faith:* ${formData.faith}\n*Children:* ${formData.children}\n*More Information:* ${formData.aboutYou}\n*MPESA Code:* ${formData.mpesaCode}\n*Looking For:* ${formData.lookingFor}`

          const fallbackWhatsAppURL = createWhatsAppUrl(whatsappNumber, message)

          toast.info(
            <p>
              Something went wrong. You can still{' '}
              <a
                href={fallbackWhatsAppURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                click here to send your details via WhatsApp
              </a>
              .
            </p>,
            { autoClose: false }
          )
        }
      } else {
        setError(result.message || 'Something went wrong.')
        toast.error('An error occurred. Please try again.')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
      toast.error('An error occurred while submitting the form.')
    }

    setLoading(false)
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full md:border px-4 md:px-32 py-12 rounded-3xl flex flex-col items-center justify-center gap-6"
        aria-live="polite"
      >
        <div className="w-full">
          <Slider ref={sliderRef} {...settings}>
            <div>
              <InputWrapper
                id="names"
                label="What's your name?"
                type="text"
                value={formData.names}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <InputWrapper
                id="email"
                label="Enter your email address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <InputWrapper
                id="phone"
                label="Enter your phone number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <InputWrapper
                id="gender"
                label="What's your gender?"
                type="radio"
                radioName="gender"
                radioOptions={['Male', 'Female']}
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <InputWrapper
                id="age"
                label="How old are you?"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <InputWrapper
                id="occupation"
                label="What's your occupation?"
                type="text"
                value={formData.occupation}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <InputWrapper
                id="location"
                label="What's your current location?"
                type="text"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <InputWrapper
                id="faith"
                label="Tell us about your faith."
                type="text"
                value={formData.faith}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputWrapper
                id="children"
                label="How many children do you have? (if any)"
                type="text"
                value={formData.children}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <InputWrapper
                id="aboutYou"
                label="Any more information you'd like to share?"
                type="textarea"
                value={formData.aboutYou}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <InputWrapper
                id="lookingFor"
                label="What are you looking for in a partner?"
                type="textarea"
                value={formData.lookingFor}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <InputWrapper
                id="mpesaCode"
                label="MPESA Confirmation Code"
                type="text"
                value={formData.mpesaCode}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p className="opacity text-4xl font-bold flux text-foreground text-center mb-4">
                {isFormComplete(formData) ? (
                  <p className="opacity-70 md:text-4xl">
                    You&apos;re all set! Click the button below to submit your
                    details.
                  </p>
                ) : (
                  <p className="opacity-70 md:text-4xl">
                    Hmm ... looks like you missed something. Please verify that
                    you filled in all the required details.
                  </p>
                )}
              </p>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading || !isFormComplete(formData)}
                  className={`w-4/5 rounded shadow-xl text-background py-2 mt-4 ${
                    loading || !isFormComplete(formData)
                      ? 'bg-gray-400 pointer-events-none cursor-not-allowed'
                      : 'bg-primary'
                  }`}
                >
                  {loading ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </div>
          </Slider>
        </div>
      </form>
    </>
  )
}

export default Form

const isFormComplete = (formData) => {
  for (const key in formData) {
    if (formData[key] === '') {
      return false
    }
  }
  return true
}
