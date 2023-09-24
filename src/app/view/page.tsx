'use client'
import styles from '../page.module.css'
import { ContactView } from "@/component/ContactView";
import { useContactView } from "@/hooks/useContactView";
import { useRouter, useSearchParams } from "next/navigation";

export default function ViewContact() {
  const searchParams = useSearchParams();
  const id = (searchParams.get('id') !== null && searchParams.get('id') !== undefined) ? searchParams.get('id') : '0';
  const { data, loading, error } = useContactView({ id });

  if (id == undefined) {
    return (
      <main></main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>View Contact</h1>
      </div>
      <div>
        {data && <ContactView data={data?.contact_by_pk} />}
      </div>
    </main>
  )
}