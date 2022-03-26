import {
  API_KEY,
  BASE_URL,
  IMG_URL,
  language,
} from './api.js'


const image_movie = document.getElementById('image-movie');
const title_movie = document.getElementById('title-movie');
const description_movie = document.getElementById('description-movie');
const btn_random_movie = document.querySelector('button');

btn_random_movie.addEventListener('click', findMovies);


function findMovies() {
  const movieIDRandom = Math.floor(Math.random() * 2000 + 1) //GERA NÚMEROS ALEATÓRIOS DE 1 À 2000

  let title 
  let description
  let image

  axios.get(`${BASE_URL}${movieIDRandom}?api_key=${API_KEY}&${language}`)
    .then(function (response) {
      title = response.data.title;
      description = response.data.overview;
      image = `${IMG_URL}/${response.data.poster_path}`;
      
      //CASO NÃO TENHA ENCONTRADO A DESCRIÇÃO DO FILME
      if (description.length === 0){
        description = 'Descrição do filme não encontrada'
      }

      image_movie.src = image;
      title_movie.innerHTML= title;
      description_movie.innerHTML = `${description.substring(0, 600)}`;// LIMITA O CARACTERES DO DA DESCRIÇÃO PARA NÃO QUEBRAR A PÁGINA
      console.log(typeof(response.data.title));
    })
    .catch(function (error) {
      console.log(error)
      image_movie.src = `https://clarify.com.br/blog/wp-content/uploads/2021/09/linguagens-de-programacao.jpg`;
      title_movie.innerHTML = 'Ops, hoje não é dia de assistir filme. Bora codar!';
      description_movie.innerHTML = ' ';
    })
}






