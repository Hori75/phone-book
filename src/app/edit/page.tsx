"use client"
import { ContactForm } from "@/component/ContactForm";
import { useContactEdit } from "@/hooks/useContactEdit";
import { useContactView } from "@/hooks/useContactView";
import { Contact } from "@/model/Contact";
import { useSearchParams } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

export default function EditContact() {
  const { editContact, edittedContact, loading, error } = useContactEdit();
  const searchParams = useSearchParams();
  const id = (searchParams.get('id') !== null && searchParams.get('id') !== undefined) ? searchParams.get('id') : '0';
  const { data: contactData } = useContactView({ id });
  const onSubmit: SubmitHandler<Contact> = (data) => {
    editContact({
      variables: {
        id, 
        _set: {
          first_name: data.first_name, 
          last_name: data.last_name
        }}});
  }

  return (
    <main>
      <div>
        <h1>Edit Contact</h1>
      </div>
      {contactData && <ContactForm prefillValue={contactData?.contact_by_pk} onSubmit={onSubmit} />}
    </main>
  );
}