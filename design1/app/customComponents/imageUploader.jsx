// components/ImageUploader.js
import { useSelector ,useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import {setSelectNewProductUploadImage} from '../store/slices/e4kTblProductProductUploadImage';

const ImageUploader = () => {
    const [imageSrc, setImageSrc] = useState('../../assets/images/user.png');
    const dispatch = useDispatch();
    const ProductSelect1 = useSelector((state) => state.selectProduct.selectProduct);
    
    
    useEffect(() => {
        if (ProductSelect1 && ProductSelect1.productid) {
            setImageSrc(ProductSelect1.styleimage);
        } else {
            setImageSrc('../../assets/images/user.png');
        }
    }, [ProductSelect1]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const base64String = event.target.result.split(',')[1];
                setImageSrc(event.target.result);
                //let image = {"image": base64String,'success': true};
                let image = {"image": base64String,"image_default":event.target.result,'success': true};
                dispatch(setSelectNewProductUploadImage(image));
                //console.log('Image uploaded base64String Stored:',image);
            };
            reader.readAsDataURL(file);
        }
    };

    

    return (
        <div className="image-container">
            <img id="displayImage" src={imageSrc} alt="Selected Image" />
            <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} />
            <style jsx>{`
                .image-container {
                    position: relative;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    overflow: hidden;
                    cursor: pointer;
                }

                .image-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }

                .image-container input[type="file"] {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default ImageUploader;

