import React from 'react';

import { ColorRing } from  'react-loader-spinner'

function Loader2() {
  return (
    <div className='content' >
        <div className="loader-center">

<ColorRing
  visible={true}
  height="150"
  width="150"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#F64E60', '#8950FC', '#3699FF', '#1BC5BD','#F64E60']}
/>
</div>
</div>
)
}
export default Loader2