import React, {useEffect, useState} from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {

    const [image, setImage] = useState({
        imageLRT:""
    });

    const {imageLRT} = image

    const preload = () => {
        fetch(`${API}/product/photo/${product._id}`,{
            method:"GET"
        }).then(response=>{
           if(response.status===200){
               setImage({...image,imageLRT:`${API}/product/photo/${product._id}`});
           }
           else{
               setImage({...image,imageLRT: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`})
           }
        })
    };

    useEffect(() => {
        preload();
    }, []);

    return (
    <div className="rounded border border-success p-2">
      <img
        src={imageLRT}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
