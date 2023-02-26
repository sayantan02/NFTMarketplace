import React from 'react'

const CustomInput = ({ name, text, type, handleChange, styles, isTextarea, isDisabled, noLabel, value }) => (

    <label className="flex-1 w-full flex flex-col">
        {text && !noLabel && (
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{text}</span>
        )}

        {isTextarea ? (
            <textarea
                required
                name={name}
                value={value}
                rows={4}
                placeholder={text}
                onChange={(e) => handleChange(e, name)}
                className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#b3b3b4] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#6d7077] rounded-[10px] sm:min-w-[300px]"
            />
        ) : isDisabled ? (
            <input
                required
                disabled
                name={name}
                value={value}
                type={type}
                step="0.01"
                placeholder={text}
                className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#b3b3b4] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#6d7077] rounded-[10px] sm:min-w-[300px] ${styles}`}
            />
        ) : (
            <input
                required
                name={name}
                value={value}
                type={type}
                step="0.01"
                placeholder={text}
                onChange={(e) => handleChange(e, name)}
                className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#b3b3b4] bg-transparent font-epilogue text-white text-[14px] placeholder:text-#6d7077] rounded-[10px] sm:min-w-[300px] ${styles}`}
            />
        )}

    </label>
)

export default CustomInput