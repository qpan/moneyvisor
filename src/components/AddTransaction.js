import { useAddEntryMutation } from '../store';
import TransactionModal from "./TransactionModal";

function AddTransaction({ entry = {}, open, handleClose }) {
  const [addEntry, results] = useAddEntryMutation();

  return (
    <TransactionModal
      entry={entry}
      open={open}
      mode="CREATE"
      useEntryMutation={[addEntry, results]}
      handleClose={handleClose}
    />
  );
}

export default AddTransaction;