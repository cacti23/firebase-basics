import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc
} from 'firebase/firestore';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updatePassword
} from 'firebase/auth';

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
// init auth services
const auth = getAuth();

// collection ref
const colRef = collection(db, 'books');

// queries
const q = query(colRef, orderBy('createdAt'));

// get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// real time collection data
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// get a single document
const docRef = doc(db, 'books', 'lWLatsTknJ0AqJFUdHAj');

// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id);
// });

// subscribe to single document
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// updating a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', updateForm.id.value);

  updateDoc(docRef, {
    title: 'updated title'
  }).then(() => {
    updateForm.reset();
  });
});

// signing users up
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created:', cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});
