import { useState,useEffect} from "react";


function About() {
  const [imageUrl, setimageUrl] = useState();
  const url = "http://localhost:4000/trying"
  const [data, setData] = useState([])

  
  useEffect(() => {
    getStudents()

  }, [])


const getStudents = () => {
fetch(url).then(resp => resp.json())
.then(resp => setData(resp)

)


}
 
  // This function will be triggered when the file field change
  const imageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setimageUrl(e.target.files[0]);
        console.log (e.target.files[0])
      }
  };

  const onSubmit = (e) => {
      e.preventDefault() 
      alert(URL.createObjectURL(imageUrl))

      const formData = new FormData()
      formData.append('imageUrl', imageUrl)
          // adding new user
          fetch(url, {
            method: "POST", body: JSON.stringify(formData), headers: {
              'content-type': "application/json"
            }
          }).then(resp => resp.json())
            .then(resp => {

              getStudents()
           
            })
  }
   
  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setimageUrl();
  };

  return (
    <div className="content">
      <div style={{marginTop: '100px'}}>
      <div className="container" >
        <h1> ReactJS Show Image Preview before Uploading </h1>
        <div className="row">
            <form onSubmit={ onSubmit } className="form-inline">
                <div className="form-group">
                <label>Choose File to Upload: </label>
                <input type="file" className="form-control" onChange={imageChange} accept="image/*"/>
                </div> <br/>
                <button type="submit" className="btn btn-success" >Upload File</button>
            </form>
 
        {imageUrl && (
          <div >
            <img
              src={URL.createObjectURL(imageUrl)}
            
              alt="Thumb"
            />
            <button onClick={removeSelectedImage} >
              Remove This Image
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;