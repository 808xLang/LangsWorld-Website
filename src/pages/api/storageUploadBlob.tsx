import { getStorage, ref, uploadBytes, StorageReference } from "firebase/storage";

// Define the file type
const file: File = new File([""], "filename.mp3"); // Replace with actual file

const storage = getStorage();
const storageRef: StorageReference = ref(storage, 'some-child');

// 'file' comes from the Blob or File API
uploadBytes(storageRef, file).then((snapshot) => {
  console.log('Uploaded a blob or file!', snapshot);
}).catch((error) => {
  console.error('Upload failed', error);
});
