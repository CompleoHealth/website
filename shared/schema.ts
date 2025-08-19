import { z } from "zod";

// Contact form schema for email notifications
export const contactFormSchema = z.object({
  type: z.enum(['b2b', 'b2c']),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  organization: z.string().min(1, "Organization is required"),
  role: z.string().min(1, "Role is required"),
  serviceInterest: z.string().min(1, "Service interest is required"),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, "You must consent to contact you"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;