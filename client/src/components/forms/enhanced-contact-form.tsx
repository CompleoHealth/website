import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { contactFormSchema } from '@shared/schema';
import { sanitizeText } from '@/lib/security';
import { trackContactFormSubmit } from '@/lib/analytics';

const enhancedContactFormSchema = contactFormSchema.extend({
  consent: z.boolean().refine(val => val === true, {
    message: "You must consent to data processing"
  })
});

type EnhancedContactFormData = z.infer<typeof enhancedContactFormSchema>;

interface EnhancedContactFormProps {
  prefilledMessage?: string;
  equipmentName?: string;
}

export default function EnhancedContactForm({ prefilledMessage, equipmentName }: EnhancedContactFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<EnhancedContactFormData>({
    resolver: zodResolver(enhancedContactFormSchema),
    defaultValues: {
      type: 'b2b',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      organization: '',
      role: '',
      serviceInterest: equipmentName || '',
      message: prefilledMessage || '',
      consent: false,
    },
  });

  // Update form values when props change
  useEffect(() => {
    if (equipmentName || prefilledMessage) {
      form.reset({
        type: 'b2b',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        serviceInterest: equipmentName || '',
        message: prefilledMessage || '',
        consent: false,
      });
    }
  }, [equipmentName, prefilledMessage, form]);

  const createContactMutation = useMutation({
    mutationFn: async (data: EnhancedContactFormData) => {
      const response = await fetch(import.meta.env.VITE_CONTACT_API_ENDPOINT || 'https://4xccwo5gph.execute-api.eu-west-2.amazonaws.com/prod/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          organization: data.organization,
          role: data.role,
          serviceInterest: data.serviceInterest,
          message: data.message,
          website: '' // Honeypot field
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Enquiry sent successfully!',
        description: 'We\'ll get back to you within one working day.',
      });
      form.reset();
    },
    onError: (error: any) => {
      // Check if it's a rate limiting error
      if (error?.status === 429) {
        const retryAfter = Math.ceil((error?.retryAfter || 900) / 60); // Convert seconds to minutes
        toast({
          title: 'Too many submissions',
          description: `Please wait ${retryAfter} minutes before submitting again.`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error sending enquiry',
          description: 'Please try again or contact us directly.',
          variant: 'destructive',
        });
      }

    },
  });

  const onSubmit = (data: EnhancedContactFormData) => {
    // Track form submission before sending
    trackContactFormSubmit(data.type || 'b2b');
    
    // Client-side sanitization for additional security
    const sanitizedData = {
      ...data,
      firstName: sanitizeText(data.firstName),
      lastName: sanitizeText(data.lastName),
      email: sanitizeText(data.email),
      phone: sanitizeText(data.phone),
      organization: sanitizeText(data.organization),
      role: sanitizeText(data.role),
      serviceInterest: sanitizeText(data.serviceInterest),
      message: sanitizeText(data.message)
    };
    createContactMutation.mutate(sanitizedData);
  };

  return (
    <Card className="bg-white/15 backdrop-blur-md border border-white/20 shadow-2xl">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Required Fields Indicator */}
            <div className="text-sm text-white/90 mb-4">
              <span style={{color: '#ef4444', fontWeight: '700', fontSize: '16px'}}>*</span> indicates required fields
            </div>

            {/* Error Summary - WCAG 2.1 AA Compliance */}
            {Object.keys(form.formState.errors).length > 0 && (
              <div
                role="alert"
                className="bg-red-600/90 border border-red-400 text-white px-4 py-3 rounded-lg mb-6"
                aria-live="polite"
              >
                <h3 className="font-bold text-lg mb-2">Please correct the following errors:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(form.formState.errors).map(([field, error]) => (
                    <li key={field} className="text-sm">
                      <strong>{field === 'firstName' ? 'First Name' :
                                field === 'lastName' ? 'Last Name' :
                                field === 'email' ? 'Email' :
                                field === 'phone' ? 'Phone' :
                                field === 'organization' ? 'Organization' :
                                field === 'serviceInterest' ? 'Service Interest' :
                                field === 'role' ? 'How did you hear about us?' :
                                field === 'message' ? 'Additional Information' :
                                field === 'consent' ? 'Consent' : field}:</strong> {error?.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-white">
                      First Name <span style={{color: '#ef4444', fontWeight: '700', fontSize: '16px'}}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder=""
                        className="bg-white text-gray-900 placeholder-gray-500 h-12 text-lg focus:ring-2 focus:ring-compleo-yellow focus:border-transparent transition-all duration-200"
                        style={{
                          backgroundColor: form.formState.errors.firstName ? '#fef7f7' : 'white',
                          border: form.formState.errors.firstName ? '3px solid #ef4444' : '2px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: form.formState.errors.firstName ? '0 0 0 2px rgba(239, 68, 68, 0.2)' : 'none'
                        }}
                        aria-describedby={form.formState.errors.firstName ? 'firstName-error' : undefined}
                        aria-invalid={form.formState.errors.firstName ? 'true' : 'false'}
                      />
                    </FormControl>
                    <FormMessage className="text-compleo-yellow" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-white">
                      Last Name <span style={{color: '#ef4444', fontWeight: '700', fontSize: '16px'}}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder=""
                        className="bg-white text-gray-900 placeholder-gray-500 h-12 text-lg focus:ring-2 focus:ring-compleo-yellow focus:border-transparent transition-all duration-200"
                        style={{
                          backgroundColor: form.formState.errors.lastName ? '#fef7f7' : 'white',
                          border: form.formState.errors.lastName ? '3px solid #ef4444' : '2px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: form.formState.errors.lastName ? '0 0 0 2px rgba(239, 68, 68, 0.2)' : 'none'
                        }}
                        aria-describedby={form.formState.errors.lastName ? 'lastName-error' : undefined}
                        aria-invalid={form.formState.errors.lastName ? 'true' : 'false'}
                      />
                    </FormControl>
                    <FormMessage className="text-compleo-yellow" />
                  </FormItem>
                )}
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-white">
                      Email Address <span style={{color: '#ef4444', fontWeight: '700', fontSize: '16px'}}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder=""
                        className="bg-white text-gray-900 placeholder-gray-500 h-12 text-lg focus:ring-2 focus:ring-compleo-yellow focus:border-transparent transition-all duration-200"
                        style={{
                          backgroundColor: form.formState.errors.email ? '#fef7f7' : 'white',
                          border: form.formState.errors.email ? '3px solid #ef4444' : '2px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: form.formState.errors.email ? '0 0 0 2px rgba(239, 68, 68, 0.2)' : 'none'
                        }}
                        aria-describedby={form.formState.errors.email ? 'email-error' : undefined}
                        aria-invalid={form.formState.errors.email ? 'true' : 'false'}
                      />
                    </FormControl>
                    <FormMessage className="text-compleo-yellow" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-white">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="e.g., 07*** ****** or 0161 *** ****"
                        className="bg-white border-0 text-gray-900 placeholder-gray-500 h-12 text-lg focus:ring-2 focus:ring-compleo-yellow focus:border-transparent transition-all duration-200"
                        aria-describedby={form.formState.errors.phone ? 'phone-error' : undefined}
                        aria-invalid={form.formState.errors.phone ? 'true' : 'false'}
                      />
                    </FormControl>
                    <FormMessage className="text-compleo-yellow" />
                  </FormItem>
                )}
              />
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="serviceInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-white">
                      How can we help you? <span style={{color: '#ef4444', fontWeight: '700', fontSize: '16px'}}>*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className="bg-white text-gray-900 h-12 text-lg focus:ring-2 focus:ring-compleo-yellow focus:border-transparent"
                          style={{
                            backgroundColor: form.formState.errors.serviceInterest ? '#fef7f7' : 'white',
                            border: form.formState.errors.serviceInterest ? '3px solid #ef4444' : '2px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: form.formState.errors.serviceInterest ? '0 0 0 2px rgba(239, 68, 68, 0.2)' : 'none'
                          }}
                        >
                          <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="managed-equipment">Managed Equipment Services</SelectItem>
                        <SelectItem value="clinical-insourcing">Clinical Insourcing</SelectItem>
                        <SelectItem value="equipment-rental">Equipment Rentals</SelectItem>
                        <SelectItem value="mobile-units">Mobile Imaging Units</SelectItem>
                        <SelectItem value="community-diagnostic">Community Diagnostic Centres</SelectItem>
                        <SelectItem value="general-enquiry">General Enquiry</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-compleo-yellow" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-white">
                      How did you hear about us? (Optional)
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white border-0 text-gray-900 h-12 text-lg focus:ring-2 focus:ring-compleo-yellow focus:border-transparent">
                          <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="google-search">Google Search</SelectItem>
                        <SelectItem value="colleague-referral">Colleague Referral</SelectItem>
                        <SelectItem value="conference">Conference/Event</SelectItem>
                        <SelectItem value="existing-client">Existing Client</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-compleo-yellow" />
                  </FormItem>
                )}
              />
            </div>

            {/* Organization Field */}
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-white">
                    Organisation <span style={{color: '#ef4444', fontWeight: '700', fontSize: '16px'}}>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder=""
                      className="bg-white text-gray-900 placeholder-gray-500 h-12 text-lg focus:ring-2 focus:ring-compleo-yellow focus:border-transparent transition-all duration-200"
                      style={{
                        backgroundColor: form.formState.errors.organization ? '#fef7f7' : 'white',
                        border: form.formState.errors.organization ? '3px solid #ef4444' : '2px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: form.formState.errors.organization ? '0 0 0 2px rgba(239, 68, 68, 0.2)' : 'none'
                      }}
                      aria-describedby={form.formState.errors.organization ? 'organization-error' : undefined}
                      aria-invalid={form.formState.errors.organization ? 'true' : 'false'}
                    />
                  </FormControl>
                  <FormMessage className="text-compleo-yellow" />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-white">
                    Additional Information (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder=""
                      className="bg-white border-0 text-gray-900 placeholder-gray-500 text-lg focus:ring-2 focus:ring-compleo-yellow focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-compleo-yellow" />
                </FormItem>
              )}
            />

            {/* Consent Checkbox */}
            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="bg-white border-white text-compleo-deep-teal focus:ring-compleo-yellow mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-white leading-relaxed">
                      By submitting this form, you consent to Compleo Healthcare storing and processing your 
                      information to respond to your enquiry. Your details will be kept secure and will not be shared 
                      with third parties. For more information, please view our privacy policy.
                    </FormLabel>
                    <FormMessage className="text-compleo-yellow" />
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={createContactMutation.isPending}
              className="w-full bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-teal/90 hover:via-compleo-teal/90 hover:to-compleo-deep-teal/90 text-white font-bold text-xl py-6 rounded-xl shadow-xl hover:shadow-2xl border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createContactMutation.isPending ? 'Sending enquiry...' : 'Send enquiry'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}