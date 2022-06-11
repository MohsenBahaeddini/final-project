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
          if (result.info.secure_url) {
            let myArr = imageUrl;
            console.log(myArr);
            myArr.push(result.info.secure_url);
            console.log(myArr);
            setImageUrl(myArr);
            console.log(imageUrl);
          }
          // console.log(result.info);
          // const newUrlArray = [result.info.secure_url];
          // setImageUrl([...newUrlArray, ...imageUrl]);
        }
      }
    );
    setWidgetRef(widget);
  }, []);

  return (
    <>
      {console.log("imageUrl ::", imageUrl)}
      <button onClick={() => widgetRef.open()}>upload image</button>
    </>
  );
};

export default UploadImage;
