# Scratch File

## mui + react-hook-form + TextField

```jsx
<Controller
  name="old_password"
  control={control}
  render={({ field: { ref, ...field } }) => (
    <TextField
      {...field}
      inputRef={ref}
      fullWidth
      required
      label="Current Password"
    />
  )}
/>
```

## mui + react-hook-form + DatePicker

```jsx
<Controller
  control={control}
  name="createdAt"
  render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...field}
        inputRef={ref}
        label="Date"
        renderInput={(inputProps) => (
          <TextField
            {...inputProps}
            onBlur={onBlur}
            name={name}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </LocalizationProvider>
  )}
/>

<Controller
  control={control}
  name="createdAt"
  render={({ field: { onChange, onBlur, value, ref } }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={onChange} // send value to hook form
        onBlur={onBlur} // notify when input is touched/blur
        selected={value}
        defaultValue={defaultValues.createdAt}
      />
    </LocalizationProvider>
  )}
/>
```

## mui + react-hook-form + Select # 1

```jsx
<FormControl
  sx={{ marginBottom: 2 }}
  fullWidth
>
  <InputLabel id="accountId">Account</InputLabel>
  <Select
    id="accountId"
    label="Account"
    error={!!errors.accountId}
    defaultValue=""
    {...register("accountId")}
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
```

## mui + react-hook-form + Select # 2

```jsx
<FormControl
  sx={{ marginBottom: 2 }}
  fullWidth
>
  <InputLabel id="accountId">Account</InputLabel>
  <Select
    id="accountId"
    label="Account"
    error={!!errors.accountId}
    defaultValue=""
    {...register("accountId")}
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
```

## mui + react-hook-form + Select # 3

```jsx
<FormControl
  sx={{ marginBottom: 2 }}
  fullWidth
>
  <InputLabel id="categoryId">Category</InputLabel>
  {
    watchTypeSelector === "income" &&
    <Select
      id="categoryId"
      label="Category"
      error={!!errors.categoryId}
      defaultValue={1}
      {...register("categoryId")}
    >
      {
        categoryData?.filter((category) => category.type === watchTypeSelector)
        .map(category => (
          <MenuItem value={category.id} key={category.id}>
            { category.emoji && <Emoji unicode={category.emoji} />}
            &nbsp;&nbsp;
            {category.name}
          </MenuItem>
        ))
      }
    </Select>
  }
  {
    watchTypeSelector === "expense" &&
    <Select
      id="categoryId"
      label="Category"
      error={!!errors.categoryId}
      defaultValue={2}
      {...register("categoryId")}
    >
      {
        categoryData?.filter((category) => category.type === watchTypeSelector)
        .map(category => (
          <MenuItem value={category.id} key={category.id}>
            { category.emoji && <Emoji unicode={category.emoji} />}
            &nbsp;&nbsp;
            {category.name}
          </MenuItem>
        ))
      }
    </Select>
  }
  <FormHelperText sx={{ color: 'error.main' }}>{errors.categoryId?.message}</FormHelperText>
</FormControl>
```

## mui + react-hook-form + Select # 4

```jsx
<FormControl
  sx={{ marginTop: 2 }}
  fullWidth
>
  <InputLabel id="typeSelector">Type</InputLabel>
  <Select
    id="typeSelector"
    label="Type"
    required
    error={!!errors.typeSelector}
    defaultValue={defaultValues.typeSelector}
    {...register("typeSelector")}
  >
    <MenuItem value={"income"}>Income</MenuItem>
    <MenuItem value={"expense"}>Expense</MenuItem>
  </Select>
  <FormHelperText sx={{ color: 'error.main' }}>{errors.typeSelector?.message}</FormHelperText>
</FormControl>
<Controller
  control={control}
  name="createdAt"
  render={({ field: { ref, ...field } }) => {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...field}
        inputRef={ref}
      />
    </LocalizationProvider>
  }}
/>
```
