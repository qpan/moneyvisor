import { z } from "zod";

export const schema = z.object({
  id: z
    .coerce
    .number()
    .nonnegative('Please select a type')
    .finite()
    .optional(),
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

