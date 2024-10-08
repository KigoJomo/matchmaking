// components/Form.js
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
      className="w-full md:w-[30vw] px-12 md:px-0 flex flex-col items-center justify-center gap-6"
      aria-live="polite"
    >
      <h2 className="text-3xl text-center mb-4">Match Making with Fred</h2>

      <InputWrapper id="names" label="Names" type="text" onChange={handleChange} required />
      <InputWrapper id="email" label="Email Address" type="email" onChange={handleChange} required />
      
      <div className="w-full flex flex-col gap-2">
        <label className="opacity-50">I am...</label>
        <div className="flex gap-4">
          <label>
            <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female
          </label>
        </div>
      </div>

      <InputWrapper id="age" label="My Age (Yrs)" type="number" onChange={handleChange} required />
      <InputWrapper id="occupation" label="Occupation" type="text" onChange={handleChange} required />
      <InputWrapper id="location" label="Location" type="text" onChange={handleChange} required />
      <InputWrapper id="faith" label="About your faith" type="text" onChange={handleChange} />
      <InputWrapper id="children" label="How many children do you have?" type="text" onChange={handleChange} required />
      
      <div className="w-full flex flex-col gap-2">
        <label className="opacity-50">Anything else you&apos;d like to share about yourself?</label>
        <textarea
          id="aboutYou"
          name="aboutYou"
          value={formData.aboutYou}
          onChange={handleChange}
          className="p-2 rounded border border-white border-opacity-25 bg-transparent"
          required
        />
      </div>

      <InputWrapper id="mpesaCode" label="MPESA Code" type="text" onChange={handleChange} required />
      
      <div className="w-full flex flex-col gap-2">
        <label className="opacity-50">What are you looking for in a partner?</label>
        <textarea
          id="lookingFor"
          name="lookingFor"
          value={formData.lookingFor}
          onChange={handleChange}
          className="p-2 rounded border border-white border-opacity-25 bg-transparent"
          required
        />
      </div>

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
