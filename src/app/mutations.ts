import gql from 'graphql-tag';

export class Mutations {
  Login = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          type
        }
      }
    }
  `;

  createFilmUser = gql `
    mutation createFilmUser($idFilm: String!) {
      createFilmUser(idFilm: $idFilm) {
        id
        user {
          id
        }
        film {
          id
          name
        }
      }
    }
  `;

  SignUp = gql `
    mutation SignUp($username: String!, $email: String!, $password: String!) {
      signup(username: $username, email: $email, password: $password) {
        token
      }
    }
  `;
}
