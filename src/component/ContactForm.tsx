"use client"
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Contact } from "@/model/Contact";
import styles from './ContactForm.module.css';

interface ContactFormProp {
  prefillValue: Contact,
  onSubmit: SubmitHandler<Contact>,
}

const nameValidation = {
  noSpecialCharacter: (v: string) => {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return !v.match(format);
  }
}

export const ContactForm = ({ prefillValue, onSubmit }: ContactFormProp) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Contact>({ defaultValues: prefillValue })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
    rules: { minLength: 1 }
  });
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input aria-invalid={errors.first_name ? "true" : "false"} placeholder="First Name"  {...register("first_name", { required: true, validate: nameValidation })} /><br />
      {errors.first_name && errors.first_name.type === "required" && (
        <><span role="alert">This is required</span><br /></>
      )}
      {errors.first_name && errors.first_name.type === "noSpecialCharacter" && (
        <><span role="alert">No special character allowed</span><br /></>
      )}
      <input placeholder="Last Name"  {...register("last_name", { required: true, validate: nameValidation })} /><br />
      {errors.last_name && errors.last_name.type === "required" && (
        <><span role="alert">This is required</span><br /></>
      )}
      {errors.last_name && errors.last_name.type === "noSpecialCharacter" && (
        <><span role="alert">No special character allowed</span><br /></>
      )}
      <label>Phones</label><br />
      <div className={styles.phones}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              key={field.id}
              placeholder="+621234567890"
              {...register(`phones.${index}.number` as const, { required: true })}
            />
            {fields.length > 1 && (<button type="button" onClick={() => { remove(index) }}>remove</button>)}
            {errors.phones?.[index]?.number && errors.phones?.[index]?.number?.type === "required" && (
              <><span role="alert">This is required{fields.length > 1 && (<>, remove if unused</>)}</span><br /></>
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={() => { append({ number: '' }) }}>Add Number</button> <br />
      <input type="submit" />
    </form>
  )
}