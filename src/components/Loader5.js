import React from 'react';
import { RotatingLines } from  'react-loader-spinner'


function Loader5() {
  return (
    <div className="content">
      <div className='loader-center'>
      <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>
        </div></div>
  )
}

export default Loader5