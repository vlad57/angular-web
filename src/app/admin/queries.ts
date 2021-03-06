import gql from 'graphql-tag';

export class Queries {
  amIAuth = gql`
    query amIAuth {
      amIAuth {
        isAuth
        me {
          type
        }
      }
    }
  `;

  listFilms = gql `
    query ListFilms {
      films {
        id
        name
        genre
        description
        duration
      }
    }
  `;

  detailFilm = gql `
  query filmDetail($idFilm: String!) {
    film(idFilm: $idFilm) {
      id
      name
      genre
      description
      duration
    }
  }
  `;
}
