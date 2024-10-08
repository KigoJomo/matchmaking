// app/components/Form.js

'use client'

import { useState } from 'react'
import InputWrapper from './InputWrapper'

const Form = () => {
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    gender: '',
    age: '',
    occupation: '',
    location: '',
    faith: '',
    children: '',
    aboutYou: '',
    mpesaCode: '',
    lookingFor: ''
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    // Submit the form to the API
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(result.message || 'Something went wrong.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-[40vw] px-12 md:px-0 flex flex-col items-center justify-center gap-6"
      aria-live="polite"
    >
      {/* Using the updated InputWrapper for each input */}
      <InputWrapper id="names" label="What's your name?" type="text" value={formData.names} onChange={handleChange} required />
      <InputWrapper id="email" label="Your email address" type="email" value={formData.email} onChange={handleChange} required />

      <InputWrapper 
        id="gender" 
        label="I am..." 
        type="radio" 
        radioName="gender" 
        radioOptions={['Male', 'Female']} 
        value={formData.gender} 
        onChange={handleChange} 
        required 
      />

      <InputWrapper id="age" label="My Age (Yrs)" type="number" value={formData.age} onChange={handleChange} required />
      <InputWrapper id="occupation" label="Occupation" type="text" value={formData.occupation} onChange={handleChange} required />
      <InputWrapper id="location" label="Location" type="text" value={formData.location} onChange={handleChange} required />
      <InputWrapper id="faith" label="About your faith" type="text" value={formData.faith} onChange={handleChange} />
      <InputWrapper id="children" label="How many children do you have?" type="text" value={formData.children} onChange={handleChange} required />

      <InputWrapper 
        id="aboutYou" 
        label="Anything else you'd like to share about yourself?" 
        type="textarea" 
        value={formData.aboutYou} 
        onChange={handleChange} 
        required 
      />

      <InputWrapper id="mpesaCode" label="MPESA Code" type="text" value={formData.mpesaCode} onChange={handleChange} required />
      
      <InputWrapper 
        id="lookingFor" 
        label="What are you looking for in a partner?" 
        type="textarea" 
        value={formData.lookingFor} 
        onChange={handleChange} 
        required 
      />

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading || !formData}
        className={`w-full rounded text-background py-2 mt-4 ${loading ? 'bg-gray-400' : 'bg-foreground'}`}
      >
        {loading ? 'Sending...' : 'Submit'}
      </button>

      {success && <p className="text-green-500 mt-4">Message sent successfully!</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  )
}

export default Form