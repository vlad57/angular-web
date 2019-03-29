import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import {HttpHeaders} from '@angular/common/http';
import {ApolloLink} from 'apollo-link';

/*const uri = 'http://localhost:4000'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}*/
 const uri = 'https://desolate-shore-50753.herokuapp.com/';
//const uri = 'http://localhost:4000';

export function provideApollo(httpLink: HttpLink) {
  const basic = setContext((op, ctx) => ({
    headers: new HttpHeaders()
      .set('Accept', 'charset=uf-8'),
  }));

  const token = localStorage.getItem('token');
  const auth = setContext((operation, ctx) => ({
     headers: ctx.headers.append('Authorization', `Bearer ${token}`)
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

  return {
    link,
    cache: new InMemoryCache()
  };
}
@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
