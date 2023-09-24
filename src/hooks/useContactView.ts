import { Contact } from "@/model/Contact";
import { ContactByPKData } from "@/model/ContactByPKData";
import { ContactListData } from "@/model/ContactListData";
import { gql, useQuery } from "@apollo/client";

const query = gql`query GetContactDetail($id: Int!){
    contact_by_pk(id: $id) {
    last_name
    id
    first_name
    created_at
    phones {
      number
    }
  }
}`;

interface useContactViewProps {
    id: string | null | undefined,
};

export const useContactView = ({id}: useContactViewProps) => {
    const { data, loading, error } = useQuery<ContactByPKData>(query, {variables: {id}});

    return {
        data,
        loading,
        error
    };
}