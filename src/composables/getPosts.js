import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const getPosts = (collection) => {
  const posts = ref([]);
  const error = ref(null);


  const load = async () => {

    try {
      const res = await projectFirestore.collection(collection).get();

      posts.value = res.docs.map(item => {
        return {... item.data(), id: item.id}
      });

      
    }
    catch(err) {
      error.value = err.message;
      console.log(error.value);
    }
  }

  return {
    posts, error, load
  }

}

export default getPosts;