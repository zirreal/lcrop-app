// allowed file types
const types = ['image/png', 'image/jpeg', 'image/jpg'];

const addImg = (e, blob, file, fileError, picSrc, text, func) => {
  const selected = e.target.files[0];
  blob.value = new Blob ([selected]);

  if(func) {
    func();
  }

  if(selected && types.includes(selected.type)) {
    file.value = selected;
    fileError.value = null;
    picSrc.value = URL.createObjectURL(blob.value);
    text.value = 'Picture is uploaded';
  } else {
    file.value = null;
    picSrc.value = null;
    fileError.value = 'Please select an image file (png/jpg/jpeg)';
    text.value = 'Upload image for a person you meeting';
  }
}

export default addImg;