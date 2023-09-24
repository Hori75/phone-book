import { Contact } from "@/model/Contact"
import Link from "next/link";
import styles from "./ContactView.module.css";
import moment from "moment";

interface ContactViewProps {
  data: Contact
}

export const ContactView = ({ data }: ContactViewProps) => {
  return (
    <div className={styles.contactInfo}>
      <h1>{data.first_name + ' ' + data.last_name}</h1>
      <p>Created {moment(data.created_at).calendar()}</p>
      <h2>Phones</h2>
      <div>
        {data?.phones?.map((phone, index) => (
          <p key={index}>{phone.number}</p>
        ))}
      </div>
    </div>
  );
}