const UploadImg = () => {
  return (
    <>
      <input
        type="file"
        name="image"
        // onChange={(ev) => {
        //   setImage(ev.target.files);
        // }}
      />
      <button
      //   onClick={uploadImage}
      >
        upload image
      </button>
    </>
  );
};
export default UploadImg;
