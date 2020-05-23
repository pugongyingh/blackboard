import {gql} from 'apollo-boost';

export default gql`
query board ($id: ID!) {
  board (id: $id) {
    name,
    id,
    color,
    time,
	user,
    notes {
      id,
      name,
      description,
	  time,
      comments {
        id
      }
    }
  }
}
`;