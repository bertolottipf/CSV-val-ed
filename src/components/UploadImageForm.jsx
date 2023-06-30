import { useEffect, useState } from "react";




const UploadImageForm = (props) => {
    const [image, setImage] = useState();

    const imageUpload = (e) => {
        const uploadedImagePath = e.target.files[0];
        setImage(URL.createObjectURL(uploadedImagePath));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.setUploadedImage(image);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
            <input type="file" onChange={(e) => imageUpload(e)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};


export default UploadImageForm;


/*


const UploadedImage = (props) => {
    if (props.uploadedImage) {
        return <img src={props.uploadedImage} alt="Uploaded image" />;
    }
    return <h2>No image uploaded</h2>;
};
export default UploadedImage;


export default function App() {
    const [uploadedImage, setUploadedImage] = useState();

    return (
      <div className="App">
        <UploadImageForm
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
        <UploadedImage uploadedImage={uploadedImage} />
      </div>
    );
  }
*/