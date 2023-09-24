"use client"
import styles from '../page.module.css'
import { ContactForm } from "@/component/ContactForm";
import { useContactAdd } from "@/hooks/useContactAdd";
import { Contact } from "@/model/Contact";
import Link from 'next/link';
import { SubmitHandler } from "react-hook-form";

const initalState: Contact = {
  first_name: '',
  last_name: '',
  id: 0,
  created_at: '',
  favorite: false,
  phones: [{
    number: ''
  }]
}

export default function AddContact() {
  const { addContact, addedContact, loading, error } = useContactAdd();
  const onSubmit: SubmitHandler<Contact> = (data) => {
    addContact({ variables: data });
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Add Contact</h1>
        <Link href="/" className={styles.link}>Back</Link>
      </div>
      <ContactForm prefillValue={initalState} onSubmit={onSubmit} />
    </main>
  )
}