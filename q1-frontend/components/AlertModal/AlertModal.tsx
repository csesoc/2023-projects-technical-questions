import { SetStateAction, Dispatch, FormEvent } from "react";
import { TableContents } from "../Table/Table";

interface AlertModalProps {
  useContents: Dispatch<SetStateAction<TableContents>>  ,
}

export default function AlertModal({useContents}: AlertModalProps) {
  function onSubmitEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /*SOLUTION*/
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContents((prevContents) => ({
      columnTitles: prevContents.columnTitles,
      rowContents: [...prevContents.rowContents, {alertType: (e.target as any).elements[0].value, alertText: '', alertOccurence: []}]
    }))
    /*SOLUTION*/
  }
  return (
    <form data-testid='form' onSubmit={onSubmitEvent}>
      <label> Add new Alert: </label>
      <input type='text' id='alert' name='alert' />
      <button type='submit'> Add </button>
    </form>
  )
}
