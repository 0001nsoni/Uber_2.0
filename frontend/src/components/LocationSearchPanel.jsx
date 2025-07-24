import React from 'react'

const LocationSearchPanel = (props) => {
  const { suggestions = [], onSuggestionClick, panelOpen } = props;

  if (!panelOpen) return null;

  return (
    <div className='mt-8'>
      {suggestions.length === 0 && (
        <div className="text-gray-400 p-3">No suggestions</div>
      )}
      {suggestions.map((suggestion, idx) => (
        <div
          key={idx}
          onClick={() => onSuggestionClick(suggestion)}
          className='flex gap-5 border-2 border-gray-50 rounded-xl active:border-black my-2 items-center p-3 cursor-pointer'
        >
          <h5 className='w-10 h-10 bg-[#eee] flex justify-center items-center rounded-full'>
            <i className="ri-map-pin-user-fill"></i>
          </h5>
          <h4 className='font-medium'>
            {suggestion.description || suggestion}
          </h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel