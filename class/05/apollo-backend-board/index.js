import { ApolloServer, gql } from 'apollo-server';
import { checkValidationPhone, getToken, sendTokenToSMS } from '../../01/phone.js';

//equivalent of swagger, api-doc
const typeDefs = gql`
  # manually creating Board Object and its key types
  # to manually create custom Object for input argument, replace type with "input"
  
  type Board {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # [Board] meaning array of object type Board
    fetchBoards: [Board]
  }
  type Mutation {
    # specifying arguments and their types
    createBoard(writer: String, title: String, contents: String): String
    createPhoneToken(phone: String): String
  }
`;

const resolvers = {
  Query: {
    fetchBoards: () => {
      const result = [
        { number: 1, writer: "Bob", title: "post one", contents: "content one" },
        { number: 2, writer: "Sally", title: "post two", contents: "content two" },
        { number: 3, writer: "Tom", title: "post three", contents: "content three" }
      ];
      return result;
    }
  },
  Mutation: {
    //args is equivalent of req.body in REST-API (when request from frontend)
    //parent is equivalent of args when backend requests to another backend
    //when not in use, can _ parent and delete the rest
    createBoard: (parent, args, context, info) => {
      console.log(args);
      return "successfully posted board!";
    },
    createPhoneToken: (_, args) => {
      const isValid = checkValidationPhone(args.phone);
      if(isValid) {
        const mytoken = getToken();
        sendTokenToSMS(req.body.phone, mytoken);
      }
      return `successfully sent ${mytoken}`;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});