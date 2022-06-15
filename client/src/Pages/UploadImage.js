import { useState, useEffect } from "react";
import styled from "styled-components";
const UploadImage = ({ imageUrl, setImageUrl }) => {
  // implementing the cloudinary uploadImage widget
  const [widgetRef, setWidgetRef] = useState(null);
  useEffect(() => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dy9df8ykq",
        uploadPreset: "fl3vhygc",
      },
      (error, result) => {
    

        if (result.event === "success") {
          if (result.info.secure_url) {
            let myArr = imageUrl;
            
            myArr.push(result.info.secure_url);
            
            setImageUrl(myArr);
           
          }
         
        }
      }
    );
    setWidgetRef(widget);
  }, []);

  return (
    <>
     
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
    transform: scale(1.01, 1.01);
    outline: none;
  }
`;
export default UploadImage;
