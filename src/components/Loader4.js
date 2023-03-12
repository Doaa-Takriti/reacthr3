
import React from 'react';

import { Dna } from  'react-loader-spinner'

function Loader4() {
  return (
    <div className='content' >
        <div className="loader-center">
<Dna
  visible={true}
  height="150"
  width="150"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/>
</div>
</div>
)
}
export default Loader4