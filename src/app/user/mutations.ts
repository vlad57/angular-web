import gql from 'graphql-tag';

export class Mutations {
  updateFilmUser = gql`
      mutation updateFilmUser ($idFilmUser: String!, $progress: String!, $finish: Boolean!) {
        updateFilmUser(
          idFilm: $idFilmUser
          progress: $progress
          finish: $finish)
          {
            id
            finish
            progress
            film {
              id
              genre
              description
              name
              genre
              duration
            }
          }
      }
  `;

  deleteFilmUser = gql `
      mutation deleteFilmUser($idFilmUser: String!) {
        deleteFilmUser(idFilm: $idFilmUser) {
          id
        }
      }
  `;
}
