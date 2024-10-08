// components/Form.js
'use client'

import { useState } from 'react'
import InputWrapper from './InputWrapper'

const Form = () => {
  const [formData, setFormData] = useState({ name: '', email: '', age: '', location: '' });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("submitting ...")
    setLoading(true)
    console.log(formData)
    setSuccess(true)
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-[30vw] px-12 md:px-0 flex flex-col items-center justify-center gap-6"
      aria-live="polite"
    >
      <h2 className="text-3xl text-center mb-4">Fill in your details below</h2>

      <InputWrapper
        id="name"
        label="Name"
        type="text"
        onChange={handleChange}
        required
      />
      <InputWrapper
        id="email"
        label="Email"
        type="email"
        onChange={handleChange}
        required
      />
      <InputWrapper
        id="age"
        label="Age"
        type="number"
        onChange={handleChange}
        required
      />
      <InputWrapper
        id="location"
        label="Location"
        type="text"
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading || !formData} // Disable when loading or fields are empty
        className={`w-full rounded text-background py-2 mt-4 ${
          loading ? 'bg-gray-400' : 'bg-foreground'
        }`}
      >
        {loading ? 'Sending...' : 'Submit'}
      </button>

      {/* Success and error messages */}
      {success && (
        <p className="text-green-500 mt-4">Message sent successfully!</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  )
}

export default Form
