import { Contact } from "@/model/Contact";
import { gql, useMutation } from "@apollo/client";


const ADD_PHONE = gql`mutation AddNumberToContact ($contact_id: Int!, $phone_number:String!) {
    insert_phone(objects: {contact_id: $contact_id, number: $phone_number}) {
      returning {
        contact {
          id
          last_name
          first_name
          phones {
            number
          }
        }
      }
    }
  }`;

const EDIT_PHONE = gql`mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number:String!) {
  update_phone_by_pk(pk_columns: $pk_columns, _set: {number: $new_phone_number}) {
    contact {
      id
      last_name
      first_name
      created_at
      phones {
        number
      }
    }
  }
}`;

export const usePhoneEdit = () => {
    const [editPhone, {loading: editLoading, error: editError }] = useMutation<Contact>(EDIT_PHONE);
    const [addPhone, {loading: addLoading, error: addError}] = useMutation<Contact>(ADD_PHONE);
    return {
      editPhone,
      editLoading,
      editError,
      addPhone,
      addLoading,
      addError
    };
  };