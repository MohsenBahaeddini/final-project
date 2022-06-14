import { useState, useEffect } from "react";
import styled from "styled-components";
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
      <Button onClick={() => widgetRef.open()}>Add Photos</Button>
    </>
  );
};
const Button = styled.button`
  color: var(--color-dark-blue);
  font-size: 16px;
  padding: 5px 200px;
  margin-top: 5px;
  cursor: pointer;

  &:hover {
    /* background-color: rgba(120, 192, 227, 0.5); */
    transform: scale(1.01, 1.01);
    outline: none;
  }
`;
export default UploadImage;
