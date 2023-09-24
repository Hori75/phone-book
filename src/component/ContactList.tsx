'use client';
import styles from '@/app/page.module.css';
import { ContactListData } from "@/model/ContactListData";
import { useRouter } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { Pagination } from './Pagination/Pagination';
import { useFavorite } from '@/hooks/useFavorite';
import { AiFillStar, AiFillCloseCircle } from "react-icons/ai";

interface ContactListProps {
  data: ContactListData,
  onDelete: (id: number) => void
};

const pageSize = 10;

export const ContactList = ({ data, onDelete }: ContactListProps) => {
  const router = useRouter()
  const { favorites, addFavorite, removeFavorite } = useFavorite();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const viewedData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data?.contact.filter((contact) => !favorites.includes(contact.id)).slice(firstPageIndex, lastPageIndex);
  }, [data, favorites, currentPage]);
  const favoriteData = useMemo(() => {
    return data?.contact.filter((contact) => favorites.includes(contact.id));
  }, [data, favorites])

  const onPageChange = (page: number) => setCurrentPage(
    (page > 0) ? ((page < data.contact.length) ? page : data.contact.length) : 1);

  return (
    <div>
      <p>Favorites</p>
      {favoriteData.map((contact) => (
        <div className={styles.card} key={contact.id}>
          <AiFillStar
            color="#FFFF00"
            size={25}
            onClick={() => removeFavorite(contact.id)}
          />
          <div className={styles.cardInfo} onClick={() => router.push(`/view?id=${contact.id}`)} key={contact.id}>
            <div>
              <h3>{contact.first_name + " " + contact.last_name}</h3>
              <p>
                {contact.phones[0].number}
              </p>
            </div>
          </div>
          <AiFillCloseCircle
            className={styles.delete}
            color="red"
            size={25}
            onClick={() => onDelete(contact.id)}
          />
        </div>
      ))}
      <p>Contact List</p>
      {viewedData.map((contact) => (
        <div className={styles.card} key={contact.id}>
          <AiFillStar
            color="#A9A9A9"
            size={25}
            onClick={() => addFavorite(contact.id)}
          />
          <div className={styles.cardInfo} onClick={() => router.push(`/view?id=${contact.id}`)} key={contact.id}>
            <div>
              <h3>{contact.first_name + " " + contact.last_name}</h3>
              <p>
                {contact.phones[0].number}
              </p>
            </div>
          </div>
          <AiFillCloseCircle
            className={styles.delete}
            color="red"
            size={25}
            onClick={() => onDelete(contact.id)}
          />
        </div>
      ))}
      <Pagination
        siblingCount={1}
        currentPage={currentPage}
        totalCount={data.contact.length}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}