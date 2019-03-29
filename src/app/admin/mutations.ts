import gql from 'graphql-tag';

export class Mutations {
  createFilm = gql `
    mutation createFilm($name: String!, $genre: String!, $description: String!, $duration: String!) {
      createFilm(
        name: $name
        genre: $genre
        description: $description
        duration: $duration
      ) {
        id
      }
    }
  `;

  updateFilm = gql `
    mutation updateFilm(
      $id: String!
      $name: String!
      $genre: String!
      $duration: String!
      $description: String!)
    {
      updateFilm(
        id: $id
        name: $name
        genre: $genre
        duration: $duration
        description: $description)
      {
        id
        name
        genre
        duration
        description
      }
    }
  `;
}
