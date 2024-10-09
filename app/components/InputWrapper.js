// app/components.InputWrapper.js

const InputWrapper = ({
  label,
  type,
  radioName,
  radioOptions = [],
  value,
  id,
  onChange,
  required,
}) => (
  <div className="w-full h-fit px-2 md:px-8 flex flex-col justify-center gap-8">
    {type === 'radio' && (
      <>
        <p className="opacity-70 text-4xl flux text-foreground">{label}</p>
        <div className="h-fit flex flex-col md:flex-row gap-6 md:gap-12 md:ml-8">
          {radioOptions.map((option, index) => (
            <label
              key={index}
              className={`capitalize pl-6 pr-12 py-2 rounded-xl border-2 backdrop-blur ${
                value === option
                  ? 'border-blue-500 bg-blue-500 bg-opacity-25'
                  : 'border-slate-400'
              } flex gap-4 items-center`}
            >
              <input
                type="radio"
                name={radioName}
                value={option}
                onChange={onChange}
                required
              />{' '}
              <p>{option}</p>
            </label>
          ))}
        </div>
      </>
    )}

    {(type === 'text' ||
      type === 'textarea' ||
      type === 'email' ||
      type === 'tel' ||
      type === 'number') && (
      <div className="flex flex-col gap-8">
        <label htmlFor={id} className="opacity-70 text-4xl flux text-foreground">
          {label}
        </label>

        {type === 'textarea' ? (
          <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="p-2 border-b-2 border-slate-400 bg-transparent outline-transparent focus:outline-0 transition-all duration-300 focus:border-primary focus:border-opacity-80"
          />
        ) : (
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="p-2 border-b-2 border-slate-400 bg-transparent outline-transparent focus:outline-0 transition-all duration-300 focus:border-primary focus:border-opacity-80"
          />
        )}
      </div>
    )}
  </div>
)

export default InputWrapper
