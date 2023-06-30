const UploadedImage = (props) => {
    if (props.uploadedImage) {
        return <img src={props.uploadedImage} alt="Uploaded image" />;
    }
    return <h2>No image uploaded</h2>;
};


export default UploadedImage;