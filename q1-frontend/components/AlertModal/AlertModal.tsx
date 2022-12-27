import { SetStateAction, Dispatch, FormEvent } from "react";
import { TableContents } from "../Table/Table";

interface AlertModalProps {
  useContents: Dispatch<SetStateAction<TableContents>>  ,
}

export default function AlertModal({useContents}: AlertModalProps) {
  const onSubmitEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // hint: the alert given is at e.target[0].value - ignore typescript being annoyings
    console.log((e.target as any)[0].value);
  }
  return (
    <form onSubmit={onSubmitEvent}>
      <label> Add new Alert: </label>
      <input type='text' id='alert' name='alert' />
      <button type='submit'> Add </button>
    </form>
  )
}
