import { ref } from '@vue/reactivity'
import { projectStorage } from '../firebase/config';
import getUser  from './getUser';

const { user } = getUser();

const useStorage = (storage) => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    if(user.value) {
      filePath.value = `${storage}/${user.value.uid}/${file.name}`;
    } else {
      filePath.value = `${storage}/${file.name}`;
    }
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch(err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const deleteImage =  async (path) => {
    const storageRef = projectStorage.ref(path);

    try {
      await storageRef.delete();
    } catch(err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return {uploadImage, deleteImage,  url, filePath, error}
}

export default useStorage;