import { Contact } from "@/model/Contact";
import { gql, useMutation } from "@apollo/client";

const DELETE_CONTACT = gql`mutation DeleteContact($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }`;

export const useContactDelete = () => {
  const [deleteContact, { data : deletedContact, loading, error }] = useMutation<Contact>(DELETE_CONTACT, {
    refetchQueries: [
      'GetContactList' // Query name
    ],
  });
  return {
    deleteContact,
    deletedContact,
    loading,
    error,
  };
};