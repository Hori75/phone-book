import { Contact } from "@/model/Contact"
import Link from "next/link";

interface ContactViewProps {
  data: Contact
}

export const ContactView = ({ data }: ContactViewProps) => {
  return (
    <div>
      <h1>{data.first_name + ' ' + data.last_name}</h1>
      <p>Created at {data.created_at}</p>
      <h2>Phones</h2>
      <div>
        {data?.phones?.map((phone, index) => (
          <p key={index}>{phone.number}</p>
        ))}
      </div>
      <Link
        href={{
          pathname: '/edit',
          query: { id: data.id },
        }}
      >
        Edit
      </Link>
    </div>
  );
}