import React from 'react';

import { MagnifyingGlass } from  'react-loader-spinner'

function Loader() {
  return (
    <div className='content' >
        <div className="loader-center">
      
        <MagnifyingGlass
  visible={true}
  height="150"
  width="150"
  ariaLabel="MagnifyingGlass-loading"
  wrapperStyle={{}}
  wrapperClass="MagnifyingGlass-wrapper"
  glassColor = '#c0efff'
  color = '#e15b64'
/>
        </div>
       </div>
  )
}

export default Loader