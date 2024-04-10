import { useEffect } from 'react';
import {useState} from 'react'
import { recognizeImageText } from '../utils/textRecognition';

export default function ImageUpload() {
    const [selectedImage,setSelectedImage] = useState("")

    // Function to handle the file upload
   async  function handleImageUpload(e){
        const imageFile = e.target.files[0];
        
        setSelectedImage(URL.createObjectURL(imageFile))

       const data = await  recognizeImageText(URL.createObjectURL(imageFile))
    }

 /*    useEffect(()=>{
       
    },[selectedImage])
     */

  return (
    <div>
        <label className='label label-text'>Upload Reciept</label>
        <input type="file" accept='image/*' className="file-input file-input-bordered w-full max-w-xs" onChange={handleImageUpload} />
        <div className='divider'></div>
        {selectedImage && <img src={selectedImage} alt="Reciept" />}

    </div>
  )
}
