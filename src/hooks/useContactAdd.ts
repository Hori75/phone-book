import { Contact } from "@/model/Contact";
import { gql, useMutation } from "@apollo/client";

const ADD_CONTACT = gql`mutation AddContactWithPhones(
    $first_name: String!, 
    $last_name: String!, 
    $phones: [phone_insert_input!]!
    ) {
  insert_contact(
      objects: {
          first_name: $first_name, 
          last_name: 
          $last_name, phones: { 
              data: $phones
            }
        }
    ) {
    returning {
      first_name
      last_name
      id
      phones {
        number
      }
    }
  }
  }`;

const EDIT_CONTACT = gql`mutation EditContactById($id: Int!, $_set: contact_set_input) {
  update_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
    id
    first_name
    last_name
    phones {
      number
    }
  }
}`;

export const useContactAdd = () => {
  const [addContact, { data : addedContact, loading, error }] = useMutation<Contact>(ADD_CONTACT);
  return {
    addContact,
    addedContact,
    loading,
    error,
  };
};