// app/components.InputWrapper.js

const InputWrapper = ({ label, type, radioName, radioOptions = [], value, id, onChange, required }) => (
  <div className="w-full flex flex-col gap-2">
    {type === 'radio' && <>
      <p className="opacity-50">{label}</p>
      {radioOptions.map((option, index) => (
        <label key={index} className="capitalize">
          <input type="radio" name={radioName} value={option} onChange={onChange} required /> {option}
        </label>
      ))}
    </>}

    {(type === 'text' || type === 'textarea' || type === 'email' || type === 'number') && (
      <>
        <label htmlFor={id} className="opacity-50">
          {label}
        </label>

        {type === 'textarea' ? (
          <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="p-2 rounded border border-white border-opacity-25 bg-transparent outline-transparent focus:outline-0 transition-all duration-300 focus:border-green-500 focus:border-opacity-80"
          />
        ) : (
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="p-2 rounded border border-white border-opacity-25 bg-transparent outline-transparent focus:outline-0 transition-all duration-300 focus:border-green-500 focus:border-opacity-80"
          />
        )}
      </>
    )}
  </div>
);

export default InputWrapper;
