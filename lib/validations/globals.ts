import { z } from 'zod'

export const CreateQualificationSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  institution: z.string(),
  obtainedAt: z.string(),
  type: z.string(),
  field: z.string()
})

export const UpdateQualificationSchema = z.object({
  id: z.string().optional(),
  authId: z.string().optional(),
  title: z.string(),
  institution: z.string(),
  obtainedAt: z.string(),
  type: z.string(),
  field: z.string(),
  snapshot: z
    .object({
      id: z.string().optional(),
      authId: z.string().optional(),
      title: z.string().optional(),
      institution: z.string().optional(),
      obtainedAt: z.string().optional(),
      type: z.string().optional(),
      field: z.string().optional()
    })
    .optional()
})

export const NewEmployeeSchema = z.object({
  email: z.string().email(),
  role: z.string(),
  departmentId: z.string(),
  title: z.string(),
  isKeyPosition: z.boolean().default(false),
  type: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string().optional(),
  employeeNumber: z.number().positive(),
  employedAt: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: 'Invalid date format'
    })
    .optional()
})

export const PerformanceSchema = z.object({
  id: z.string().optional().default('0'),
  authId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  plan: z
    .string()
    .regex(/\d{4}/, { message: 'plan should be like this 2024' })
    .optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  actualEndDate: z.string().optional(),
  actualStartDate: z.string().optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
  progress: z
    .number()
    .min(0, { message: 'Progress must be greater than or equal to 0 ' }),
  success: z.string().optional(),
  comment: z.string().optional(),
  category: z.string().optional()
})

export const IdpSchema = z.object({
  id: z.string().optional(),
  authId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  plan: z
    .string()
    .regex(/\d{4}/, { message: 'plan should be like this 2024' })
    .optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  actualEndDate: z.string().optional(),
  actualStartDate: z.string().optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
  progress: z.number().min(0),
  success: z.string().optional(),
  comment: z.string().optional(),
  type: z.string().optional(),
  category: z.string().optional(),
  trainer: z.string().optional(),
  duration: z
    .number()
    .positive({ message: 'duration must be grater then 0' })
    .optional()
})

export const PotentialRatingSchema = z.object({
  assessments: z.array(
    z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      rating: z.number(),
      authId: z.string().optional(),
      skillId: z.string().optional(),
      plan: z.string().optional(),
      isBossRating: z.boolean().optional(),
      Levels: z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().optional(),
            weight: z.number().optional()
          })
        )
        .optional()
    })
  )
})

export type PotentialRatingSchemaType = z.infer<typeof PotentialRatingSchema>

export const SuccessionSchema = z.object({
  id: z.string().optional(),
  positionId: z.string(),
  candidateId: z.string(),
  date: z.string(),
  readiness: z.string(),
  ranking: z.number().positive(),
  status: z.string().optional(),
  isInterimSuccessor: z.boolean().optional().default(false)
})

export type SuccessionSchemaType = z.infer<typeof SuccessionSchema>

export const AccountSettingFormSchema = z.object({
  lang: z.string().optional(),
  username: z
    .string()
    // .min(1)
    .max(39)
    .refine(
      (value) => value === '' || /^[a-zA-Z0-9_-]+$/.test(value),
      'Username must contain only letters (a-z, A-Z), numbers (0-9), hyphens (-), or underscores (_).'
    )
    .optional(),
  bio: z.string().optional(),
  backupEmail: z.string().optional()
})

export type AccountSettingFormType = z.infer<typeof AccountSettingFormSchema>

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().optional(),
  currentPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter'
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter'
    })
    .refine((password) => /\d/.test(password), {
      message: 'Password must contain at least one digit'
    })
    .refine((password) => /[!@#$%^&*(),.?:{}|<>]/.test(password), {
      message: 'Password must contain at least one special character'
    }),
  repeatPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter'
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter'
    })
    .refine((password) => /\d/.test(password), {
      message: 'Password must contain at least one digit'
    })
    .refine((password) => /[!@#$%^&*(),.?:{}|<>]/.test(password), {
      message: 'Password must contain at least one special character'
    })
})

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>

export const settingCompanySchema = z.object({
  name: z.string().optional(),
  website: z.string().optional(),
  industry: z.string().optional(),
  founded: z.string().optional(),
  employeeCountCategory: z.string().optional(),
  description: z.string().optional().nullable(),
  image: z.string().url().optional()
})

export type settingCompanyType = z.infer<typeof settingCompanySchema>

const LevelSchema = z.object({
  id: z.string(),
  title: z.string(),
  weight: z.number().min(1).max(5), // Assuming weight should be between 1 and 5
  description: z.string().optional()
})

export const EditAssessmentSchema = z.object({
  id: z.string().optional(),
  rating: z.number().positive().min(0).max(5),
  authId: z.string().optional(),
  isBossRating: z.boolean().optional(),
  plan: z.string().length(4).optional(),
  requiredLevel: z.number().positive().optional()
})

export const EditCustomCompetencySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  Levels: z.array(LevelSchema).optional()
})

export type EditCustomCompetencyType = z.infer<
  typeof EditCustomCompetencySchema
>
export type EditAssessmentType = z.infer<typeof EditAssessmentSchema>

export const EditCompetencySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  requiredLevel: z.number().positive().min(0).max(5).optional(),
  Levels: z.array(LevelSchema).optional(),
  sector: z.string().optional()
})

export type EditCompetencyType = z.infer<typeof EditCompetencySchema>

export const EditCompetencyCardSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  requiredLevel: z.number().positive().min(0).max(5).default(5),
  Levels: z.array(LevelSchema).optional()
})

export type EditCompetencyCardType = z.infer<typeof EditCompetencyCardSchema>
