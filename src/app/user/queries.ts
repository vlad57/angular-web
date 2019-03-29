import gql from 'graphql-tag';

export class Queries {
  amIAuth = gql`
    query amIAuth {
      amIAuth {
        isAuth
        me {
          type
          id
        }
      }
    }
  `;

  filmsUser = gql `
    query filmsUser {
      filmsUser {
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

  filmsUserFinished = gql `
    query filmsUserFinished {
      filmsUserFinished {
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

  filmsUserNotFinished = gql `
    query filmsUserNotFinished {
      filmsUserNotFinished {
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
}
