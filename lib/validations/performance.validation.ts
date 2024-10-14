import { Contact } from 'lucide-react'
import { z } from 'zod'

export const PerformanceAssessmentSchema = z.object({
  title: z.string(),
  assessment: z.number().positive().min(0).max(5)
})
