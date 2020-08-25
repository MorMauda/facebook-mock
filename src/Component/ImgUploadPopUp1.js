
import React , {useState} from 'react';
import '../ImgUploadPopUp.css';
import axios from "axios";

import { PhotoCamera } from '@material-ui/icons';
export const ImgUploadPopUp = ({OnImgUploadWindowClose, updateUserProfilePicture, updateUserCoverPicture, uploadType,updatePostPicture}) => {
    const url = "http://localhost:4000";

    const [image, setImage] = useState({});

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });

        }
    };

    const handleUpload = async e => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", image.raw)
        axios.post(url+"/upload", data, {})
            .then(res => {
                if (res.data.originalname != undefined) {
                    if (uploadType == "profile") {
                        updateUserProfilePicture("./pics/" + res.data.originalname)
                    } else if (uploadType == "cover") {
                        updateUserCoverPicture("./pics/" + res.data.originalname)
                    } else if (uploadType == "post") {
                        updatePostPicture("./pics/" + res.data.originalname)

                    }
                }else{
                    alert("You have to pic a picture first ! " );

                }
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
                {/*{console.log("Preview::: " + image.preview)}*/}
                <div className="picture">
                    <input type="file"  name= "file" onChange={handleChange}/>
                    <i className='fa fa-camera'></i>
                    <h3><PhotoCamera/> Choose your picture</h3>
                    <div className='clearfix'></div>
                </div>

                <div>{image.raw ? image.preview :""}</div>

                <button className='btn btn-dark mt-15' onClick={handleUpload}>Upload Picture</button>
                <button className='btn btn-dark mt-15' onClick ={handleClose}>Close</button>

            </form>
        </div>
    );
};


export default ImgUploadPopUp;