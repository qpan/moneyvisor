import dayjs from "dayjs";
import { useUpdateEntryMutation } from "../store";
import TransactionModal from "./TransactionModal";

function EditTransaction({ entry, open, handleClose }) {
  const [updateEntry, results] = useUpdateEntryMutation();

  const entrySanitized = { ...entry, createdAt: dayjs(entry.createdAt) };

  return (
    <TransactionModal
      entry={entrySanitized}
      open={open}
      mode="UPDATE"
      useEntryMutation={[updateEntry, results]}
      handleClose={handleClose}
    />
  );
}

export default EditTransaction;