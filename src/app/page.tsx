'use client'
import styles from './page.module.css';
import { ContactList } from '@/component/ContactList';
import { useContactDelete } from '@/hooks/useContactDelete';
import { useContactList } from '@/hooks/useContactList';
import Link from 'next/link';

export default function Home() {
  const {data, error} = useContactList();
  const {deleteContact} = useContactDelete();

  const onDelete = (id: number) => deleteContact({variables: {id}});
  
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Contacts</h1>
        <Link href="/add" className={styles.link}>Add</Link>
      </div>
      {data && <ContactList data={data} onDelete={onDelete} />}
    </main>
  )
}
