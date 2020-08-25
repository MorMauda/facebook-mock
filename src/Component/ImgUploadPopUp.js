
import React , {useState} from 'react';
import '../ImgUploadPopUp.css';
import axios from "axios";

import { PhotoCamera } from '@material-ui/icons';
export const ImgUploadPopUp = ({OnImgUploadWindowClose, updateUserProfilePicture, updateUserCoverPicture, uploadType,updatePostPicture}) => {
    const url = "http://localhost:4000";

    const [image, setImage] = useState({});

    const handleChange = e => {
        if(maxSelectFile(e)){
            setImage({
                // preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files
            });

        }
    };

    const maxSelectFile=(e)=>{
        let files = e.target.files // create file object
        if (files.length > 6) {
            const msg = 'Only 6 images can be uploaded at a time'
            e.target.value = null // discard selected file
            alert(msg)
            return false;

        }
        return true;

    }


    const handleUpload = async e => {
        console.log("Image : "+image.raw.length)
        e.preventDefault();
        const data = new FormData()
        for(let i = 0; i<image.raw.length; i++) {
            data.append("file",image.raw[i])
        }

        await axios.post(url+"/upload", data, {})
            .then(res => {

                alert("Go and check if uploaded")
                // console.log("res data  :  " + res.data[0].originalname);
                // if (res.data[0].originalname != undefined) {
                //
                //     // if (uploadType == "profile") {
                //     //     updateUserProfilePicture("./pics/" + res.data[0].originalname)
                //     // } else if (uploadType == "cover") {
                //     //     updateUserCoverPicture("./pics/" + res.data[0].originalname)
                //     // } else if (uploadType == "post") {
                //     //     updatePostPicture("./pics/" + res.data.originalname)
                //     //
                //     // }
                // }else{
                //     alert("You have to pic a picture first ! " );
                //
                // }
            }).catch(err =>{
                alert("Failed : " + err);
        })

    };


    const handleClose = () => {
        OnImgUploadWindowClose();
    }

    return (
        <div className="setup-picture">
            {/*<h1 className='title'>Start setting your account Picture</h1>*/}
            <form method="post" onSubmit="return false">
                Start setting your account Picture
                {console.log("Preview::: " + image.preview)}
                <img src={image && image.preview} id='uploaded' />
                <div className="picture">
                    <input type="file" multiple name= "file" onChange={handleChange}/>
                    <i className='fa fa-camera'></i>
                    <h3><PhotoCamera/> Choose your picture</h3>
                    <div className='clearfix'></div>
                </div>
                <button className='btn btn-dark mt-15' onClick={handleUpload}>Upload Picture</button>
                <button className='btn btn-dark mt-15' onClick ={handleClose}>Close</button>

            </form>
        </div>
    );
};


export default ImgUploadPopUp;