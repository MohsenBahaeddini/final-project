import { useState, useEffect } from "react";

const UploadImage = ({ imageUrl, setImageUrl }) => {
  // maybe an object
  const [widgetRef, setWidgetRef] = useState(null);
  useEffect(() => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dy9df8ykq",
        uploadPreset: "fl3vhygc",
      },
      (error, result) => {
        // console.log(error, result);

        // handle all the events
        // events reference:

        if (result.event === "success") {
          setImageUrl([...imageUrl, result.info.secure_url]);
        }
      }
    );
    setWidgetRef(widget);
  }, []);
  return (
    <>
      <button onClick={() => widgetRef.open()}>upload image</button>
    </>
  );
};

export default UploadImage;
