const firebase = require('firebase/app');
require('firebase/database');
require('firebase/auth');

const firebaseConfig = {
    apiKey: process.env.apikey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
function getMoviesFromDB(){
    return new Promise((resolve, reject)=>{
        database.ref('/movies').once('value')
        .then((snapshot)=>{
            let movies = [];
            let results = snapshot.val();

            for(let key in results){
                movies.push(results[key]);
            }resolve(movies);
        }).catch(error =>{
            resolve([]);
            console.log(error)
        });
    });
    
}

module.exports = {
      getMovies: ()=> {
        return getMoviesFromDB();
      },
      updateMovie: async (movie)=>{
          let movies = await getMoviesFromDB();
          let position = movies.findIndex(m =>{
              return m.id === movie.id;
          });
        return new Promise((resolve, reject) =>{
            firebase.database().ref('/movies/' + position).set(movie)
            .then(()=>{
                resolve(movie);
            }).catch(err =>{
                reject(err);
                console.log(error);
            });
        }); 
      },
      createMovie: async (movie)=>{
        let movies = await getMoviesFromDB();
        let position = movies.length;
        console.log(movie);
        return new Promise((resolve, reject)=>{
            firebase.database().ref('/movies/' + position).set(movie)
          .then(()=>{
            resolve(movie);
        }).catch(err =>{
            reject(err);
            console.log(error);
        });
        })
          
    },
    deleteMovie: async (movie)=>{
        let movies = await getMoviesFromDB();
        let position = movies.findIndex(m =>{
            return m.id === movie.id;
        });
      return new Promise((resolve, reject) =>{
          firebase.database().ref('/movies/' + position).remove()
          .then(()=>{
              resolve(movie);
          }).catch(err =>{
              reject(err);
              console.log(error);
          });
      }); 
    },
  }

