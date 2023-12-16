import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  capitalize,
  first,
} from 'lodash';
import { forwardRef } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useAddEntryMutation, useFetchAccountsQuery, useFetchCategoriesQuery, useFetchTypesQuery } from '../store';
import Emoji from './Emoji';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const schema = z.object({
  typeId: z
    .coerce
    .number()
    .nonnegative('Please select a type')
    .finite(),
  amount: z
    .coerce
    .number()
    .nonnegative('Amount must be greater than or equal to 0')
    .finite()
    .optional(),
  createdAt: z
    .coerce
    .date('Please select a date')
    .optional(),
  categoryId: z
    .coerce
    .number()
    .positive('Please select a category')
    .nonnegative()
    .finite(),
  accountId: z
    .coerce
    .number()
    .positive('Please select an account')
    .nonnegative()
    .finite(),
  note: z
    .string()
    .optional()
})

function AddTransactionModal({ open, handleClose }) {
  const { data: typeData } = useFetchTypesQuery();
  const { data: categoryData } = useFetchCategoriesQuery();
  const { data: accountData } = useFetchAccountsQuery();
  const [addEntry, results] = useAddEntryMutation();

  const {
    reset,
    resetField,
    clearErrors,
    watch,
    handleSubmit,
    control,
    formState: { errors, defaultValues },
  } = useForm({
    defaultValues: {
      amount: '',
      typeId: 2,
      createdAt: dayjs(Date()),
      categoryId: '',
      accountId: '',
      note: '',

    },
    resolver: zodResolver(schema),
  });
  const watchTypeId = watch('typeId');

  const onSubmit = (values) => {
    console.log({ ...values });
    addEntry(values);
    handleClose();
    reset();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        clearErrors();
        handleClose();
      }}
      TransitionComponent={Transition}
    >
    <DialogTitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <Box sx={{ fontWeight: 'normal' }}>Add Transaction</Box>
        <Box>
          {capitalize(first(typeData?.filter(type => type.id === watchTypeId))?.name)}
        </Box>
      </Box>
    </DialogTitle>
    <DialogContent>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
        '& .MuiTextField-root': { marginTop: 2 },
      }}>
        <Controller
          control={control}
          name="typeId"
          render={({ field: { ref, onChange, ...field }}) => {
            return <FormControl
              sx={{ marginTop: 2 }}
              fullWidth
            >
              <InputLabel id="typeId">Type</InputLabel>
              <Select
                id="typeId"
                label="Type"
                error={!!errors.typeId}
                defaultValue={defaultValues.typeId}
                onChange={(event) => {
                  resetField("categoryId");
                  onChange(event);
                }}
                {...field}
                inputRef={ref}
              >
                {typeData?.map(type => (
                  <MenuItem value={type.id} key={type.id}>
                    {capitalize(type.name)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'error.main' }}>{errors.typeId?.message}</FormHelperText>
            </FormControl>
          }}
        />
        <Controller
          control={control}
          name="createdAt"
          render={({ field: { ref, onChange, ...field } }) => {
            return <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(value) => onChange(value || dayjs(Date()))}
                {...field}
                inputRef={ref}
              />
            </LocalizationProvider>
          }}
        />
        <Controller
          control={control}
          name="amount"
          render={({ field: { ref, onChange, ...field }}) => {
            return <TextField
              sx={{ marginBottom: 2 }}
              fullWidth
              id="amount"
              label="Amount"
              type="number"
              onChange={(event) => onChange(event)}
              {...field}
              inputRef={ref}
            />
          }}
        />
        <Controller
          control={control}
          name="categoryId"
          render={({ field: { ref, ...field }}) => {
            return <FormControl
              sx={{ marginBottom: 2 }}
              fullWidth
            >
              <InputLabel id="categoryId">Category</InputLabel>
              <Select
                id="categoryId"
                label="Category"
                error={!!errors.categoryId}
                defaultValue={defaultValues.categoryId}
                {...field}
                inputRef={ref}
              >
                {
                  categoryData?.filter((category) => category.typeId === watchTypeId)
                  .map(category => (
                    <MenuItem value={category.id} key={category.id}>
                      { category.emoji && <Emoji unicode={category.emoji} />}
                      &nbsp;&nbsp;
                      {category.name}
                    </MenuItem>
                  ))
                }
              </Select>
              <FormHelperText sx={{ color: 'error.main' }}>{errors.categoryId?.message}</FormHelperText>
            </FormControl>
          }}
        />
        <Controller
          control={control}
          name="accountId"
          render={({ field: { ref, ...field }}) => {
            return <FormControl
              fullWidth
            >
              <InputLabel id="accountId">Account</InputLabel>
              <Select
                id="accountId"
                label="Account"
                error={!!errors.accountId}
                defaultValue={defaultValues.accountId}
                {...field}
                inputRef={ref}
              >
                {accountData?.map(account => (
                  <MenuItem value={account.id} key={account.id}>
                    { account.emoji && <Emoji unicode={account.emoji} />}
                    &nbsp;&nbsp;
                    {account.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'error.main' }}>{errors.accountId?.message}</FormHelperText>
            </FormControl>
          }}
        />
        <Controller
          control={control}
          name="note"
          render={({ field: { ref, ...field }}) => {
            return <TextField
              sx={{ marginBottom: 2 }}
              fullWidth
              id="note"
              label="Note"
              {...field}
              inputRef={ref}
            />
          }}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={results.isLoading}
        >
          Add
        </Button>
      </Box>
    </DialogContent>
    </Dialog>
  );
}

export default AddTransactionModal;