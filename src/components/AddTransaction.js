import { useAddEntryMutation } from '../store';
import TransactionModal from "./TransactionModal";

function AddTransaction({ open, handleClose }) {
  const [addEntry, results] = useAddEntryMutation();

  return (
    <TransactionModal
      open={open}
      mode="CREATE"
      useEntryMutation={[addEntry, results]}
      handleClose={handleClose}
    />
  );
}

export default AddTransaction;