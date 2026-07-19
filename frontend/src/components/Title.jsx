import React from 'react'

const Title = ({ text1, text2, align = "center" }) => {
  const alignment = align === "center" ? "justify-center" : "justify-start";
  return (
    <div className={`flex items-center gap-3 mb-3 ${alignment}`}>
      <span className="w-8 h-[2px] bg-accent-400 sm:w-12"></span>
      <h2 className="text-ink-500 uppercase tracking-[0.18em] text-xs font-medium">
        {text1} <span className="text-ink-900 font-semibold tracking-normal normal-case text-lg sm:text-xl">{text2}</span>
      </h2>
    </div>
  )
}

export default Title
