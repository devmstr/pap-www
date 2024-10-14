import { z } from 'zod'

export const SetupCompanySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters long' }),
  industry: z
    .string()
    .min(2, { message: 'Industry must be at least 2 characters long' }),
  founded: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: 'Invalid date format'
    })
    .optional(),
  website: z.string().optional(),
  founders: z.string().optional(),
  employeeCount: z.number().optional()
})

const Department = z.object({
  name: z.string(),
  divisionId: z.string()
})

const Departments = z.array(Department)

const Division = z.object({
  prefix: z
    .string()
    .refine((value) => /^[A-Z]{1,15}(_[A-Z]{1,5})?$/.test(value), {
      message:
        'prefix must be at most 15 uppercase letters or at most 15 + 5 uppercase letters separated by an underscore'
    }),
  name: z.string(),
  companyId: z.string()
})

const Divisions = z.array(Division)

export const SetupUnitsSchema = z.object({
  divisions: Divisions,
  departments: Departments
})
