import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBNP71YDQmYOTgYA6rrZzH6QR_-eqZBQq8',
  authDomain: 'fir-dojo-e9828.firebaseapp.com',
  projectId: 'fir-dojo-e9828',
  storageBucket: 'fir-dojo-e9828.appspot.com',
  messagingSenderId: '544388767414',
  appId: '1:544388767414:web:621efdf30115d160811017'
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });
