import { z } from 'zod'

export const AuthSchema = z.object({
  sub: z.string(),
  image: z.string().url(),
  displayName: z.string(),
  role: z.string(),
  email: z.string().email()
})

export const PersonalSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name is too long' }),
  lastName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'Last name is too long' }),
  middleName: z.string().optional(),
  gender: z.string().length(1).optional(), // Assuming 'M' or 'F'
  marital: z.string().optional(),
  dob: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: 'Invalid date format'
    })
    .optional(),
  sons: z.number().optional(),
  ssn: z.string().optional(),
  snapshot: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      middleName: z.string().optional(),
      gender: z.string().length(1),
      marital: z.string(),
      dob: z.string(),
      sons: z.number().optional(),
      ssn: z.string().optional()
    })
    .optional()
})

export const ContactSchema = z.object({
  mobile: z.string().min(10, { message: 'Mobile number is required' }),
  home: z.string().optional(),
  work: z.string().optional(),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .optional(),
  street1: z.string().optional(),
  street2: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  snapshot: z
    .object({
      mobile: z.string().optional(),
      home: z.string().optional(),
      work: z.string().optional(),
      email: z.string().optional(),
      street1: z.string().optional(),
      street2: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional()
    })
    .optional()
})

export const PositionSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.string().optional(),
  isKeyPosition: z.boolean(),
  employeeNumber: z.number().positive(),
  employedAt: z.string().optional()
})

export const JobSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.string().optional(),
  isKeyPosition: z.boolean(),
  employeeNumber: z.number().positive(),
  employedAt: z.string().optional(),
  Department: z.object({
    id: z.string().optional(),
    name: z.string().optional()
  }),
  role: z.string().optional()
})

export type JobSchemaType = z.infer<typeof JobSchema>
