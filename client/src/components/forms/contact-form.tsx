import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { contactFormSchema } from '@shared/schema';
import { sanitizeText } from '@/lib/security';

const b2bContactFormSchema = contactFormSchema.extend({
  type: z.literal('b2b'),
});

type ContactFormData = z.infer<typeof b2bContactFormSchema>;

interface ContactFormProps {
  prefilledMessage?: string;
  equipmentName?: string;
}

export default function ContactForm({ prefilledMessage, equipmentName }: ContactFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(b2bContactFormSchema),
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

  const createContactMutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: 'Message sent successfully!',
        description: 'We\'ll get back to you within 24 hours.',
      });
      form.reset();
    },
    onError: (error) => {
      console.error('Contact form error:', error);
      toast({
        title: 'Error sending message',
        description: 'Email service is currently unavailable. Please contact us directly at sales@compleohealth.com or call +44 (0)161 884 1303.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // Client-side sanitization for additional security
    const sanitizedData = {
      ...data,
      firstName: sanitizeText(data.firstName),
      lastName: sanitizeText(data.lastName),
      email: sanitizeText(data.email),
      phone: sanitizeText(data.phone || ''),
      organization: sanitizeText(data.organization),
      role: sanitizeText(data.role),
      serviceInterest: sanitizeText(data.serviceInterest),
      message: sanitizeText(data.message || ''),
      consent: data.consent
    };
    createContactMutation.mutate(sanitizedData);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-0 shadow-2xl">
      <CardContent className="p-6 sm:p-8 lg:p-10">
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-white uppercase tracking-wider">
                      FIRST NAME <span style={{color: '#ef4444', fontWeight: '900', fontSize: '18px'}}>*</span>
                    </FormLabel>
                    <FormControl>
                      <div 
                        className={form.formState.errors.firstName ? 'border-8 border-red-500 shadow-xl shadow-red-500/40 bg-red-50' : 'border-2 border-transparent'}
                        style={{
                          borderRadius: '8px',
                          padding: '4px',
                          transition: 'all 0.3s ease',
                          // Force with extreme visibility for testing
                          border: form.formState.errors.firstName ? '12px solid #ff0000' : '2px solid transparent',
                          backgroundColor: form.formState.errors.firstName ? '#ffcccc' : 'transparent',
                          boxShadow: form.formState.errors.firstName ? '0 0 20px #ff0000' : 'none'
                        }}
                        data-has-error={form.formState.errors.firstName ? 'true' : 'false'}>
                        <Input
                          {...field}
                          placeholder="John"
                          className="bg-white/90 border-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                          style={{
                            backgroundColor: form.formState.errors.firstName ? '#fef2f2' : 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none'
                          }}
                          aria-describedby={form.formState.errors.firstName ? 'firstName-error' : undefined}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-white uppercase tracking-wider">
                      LAST NAME <span style={{color: '#ef4444', fontWeight: '900', fontSize: '18px'}}>*</span>
                    </FormLabel>
                    <FormControl>
                      <div style={{
                        border: form.formState.errors.lastName ? '8px solid #ef4444' : '2px solid transparent',
                        borderRadius: '8px',
                        boxShadow: form.formState.errors.lastName ? '0 0 0 8px rgba(239, 68, 68, 0.4)' : 'none',
                        backgroundColor: form.formState.errors.lastName ? '#fef2f2' : 'transparent',
                        padding: '4px',
                        transition: 'all 0.3s ease'
                      }}>
                        <Input
                          {...field}
                          placeholder="Smith"
                          className="bg-white/90 border-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                          style={{
                            backgroundColor: form.formState.errors.lastName ? '#fef2f2' : 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none'
                          }}
                          aria-describedby={form.formState.errors.lastName ? 'lastName-error' : undefined}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-white uppercase tracking-wider">
                    EMAIL <span style={{color: '#ef4444', fontWeight: '900', fontSize: '18px'}}>*</span>
                  </FormLabel>
                  <FormControl>
                    <div style={{
                      border: form.formState.errors.email ? '8px solid #ef4444' : '2px solid transparent',
                      borderRadius: '8px',
                      boxShadow: form.formState.errors.email ? '0 0 0 8px rgba(239, 68, 68, 0.4)' : 'none',
                      backgroundColor: form.formState.errors.email ? '#fef2f2' : 'transparent',
                      padding: '4px',
                      transition: 'all 0.3s ease'
                    }}>
                      <Input
                        {...field}
                        type="email"
                        placeholder="john.smith@hospital.nhs.uk"
                        className="bg-white/90 border-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                        style={{
                          backgroundColor: form.formState.errors.email ? '#fef2f2' : 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          outline: 'none',
                          boxShadow: 'none'
                        }}
                        aria-describedby={form.formState.errors.email ? 'email-error' : undefined}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-white uppercase tracking-wider">
                    ORGANIZATION <span style={{color: '#ef4444', fontWeight: '900', fontSize: '18px'}}>*</span>
                  </FormLabel>
                  <FormControl>
                    <div style={{
                      border: form.formState.errors.organization ? '8px solid #ef4444' : '2px solid transparent',
                      borderRadius: '8px',
                      boxShadow: form.formState.errors.organization ? '0 0 0 8px rgba(239, 68, 68, 0.4)' : 'none',
                      backgroundColor: form.formState.errors.organization ? '#fef2f2' : 'transparent',
                      padding: '4px',
                      transition: 'all 0.3s ease'
                    }}>
                      <Input
                        {...field}
                        placeholder="NHS Trust / Hospital"
                        className="bg-white/90 border-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                        style={{
                          backgroundColor: form.formState.errors.organization ? '#fef2f2' : 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          outline: 'none',
                          boxShadow: 'none'
                        }}
                        aria-describedby={form.formState.errors.organization ? 'organization-error' : undefined}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-white uppercase tracking-wider">
                    ROLE <span style={{color: '#ef4444', fontWeight: '900', fontSize: '18px'}}>*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div style={{
                        border: form.formState.errors.role ? '8px solid #ef4444' : '2px solid transparent',
                        borderRadius: '8px',
                        boxShadow: form.formState.errors.role ? '0 0 0 8px rgba(239, 68, 68, 0.4)' : 'none',
                        backgroundColor: form.formState.errors.role ? '#fef2f2' : 'transparent',
                        padding: '4px',
                        transition: 'all 0.3s ease'
                      }}>
                        <SelectTrigger 
                          className="bg-white/90 border-0 text-gray-900 focus:ring-0 focus:outline-none"
                          style={{
                            backgroundColor: form.formState.errors.role ? '#fef2f2' : 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none'
                          }}
                          aria-describedby={form.formState.errors.role ? 'role-error' : undefined}
                        >
                          <SelectValue placeholder="Select your role..." />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="radiologist">Radiologist</SelectItem>
                      <SelectItem value="radiographer">Radiographer</SelectItem>
                      <SelectItem value="procurement">Procurement Manager</SelectItem>
                      <SelectItem value="estates">Estates & Facilities</SelectItem>
                      <SelectItem value="clinical-governance">Clinical Governance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-white uppercase tracking-wider">
                    SERVICE INTEREST <span style={{color: '#ef4444', fontWeight: '900', fontSize: '18px'}}>*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div style={{
                        border: form.formState.errors.serviceInterest ? '8px solid #ef4444' : '2px solid transparent',
                        borderRadius: '8px',
                        boxShadow: form.formState.errors.serviceInterest ? '0 0 0 8px rgba(239, 68, 68, 0.4)' : 'none',
                        backgroundColor: form.formState.errors.serviceInterest ? '#fef2f2' : 'transparent',
                        padding: '4px',
                        transition: 'all 0.3s ease'
                      }}>
                        <SelectTrigger 
                          className="bg-white/90 border-0 text-gray-900 focus:ring-0 focus:outline-none"
                          style={{
                            backgroundColor: form.formState.errors.serviceInterest ? '#fef2f2' : 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none'
                          }}
                        >
                          <SelectValue placeholder="Select service..." />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="managed-equipment">Managed Equipment Services</SelectItem>
                      <SelectItem value="clinical-insourcing">Clinical Insourcing</SelectItem>
                      <SelectItem value="equipment-rental">Equipment Rentals</SelectItem>
                      <SelectItem value="mobile-units">Mobile Imaging Units</SelectItem>
                      <SelectItem value="community-diagnostic">Community Diagnostic Centres</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-white uppercase tracking-wider">
                    PHONE
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="+44 161 884 1303"
                      className="bg-white/90 border-white/50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-compleo-yellow focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-white uppercase tracking-wider">
                    MESSAGE
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      className="bg-white/90 border-white/50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-compleo-yellow focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem 
                  className={`flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 ${
                    form.formState.errors.consent 
                      ? '' 
                      : 'border border-white/30 bg-white/10'
                  }`}
                  style={form.formState.errors.consent ? {
                    border: '4px solid #ef4444',
                    boxShadow: '0 0 0 4px rgba(239, 68, 68, 0.3)',
                    backgroundColor: 'rgba(254, 242, 242, 0.2)',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  } : {}}>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={`border-white/50 data-[state=checked]:bg-compleo-yellow data-[state=checked]:text-compleo-deep-teal ${
                        form.formState.errors.consent 
                          ? 'border-red-500 border-2 ring-2 ring-red-300' 
                          : ''
                      }`}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel style={form.formState.errors.consent ? {color: '#fecaca', fontWeight: 'bold'} : {color: 'white'}} className="text-sm">
                      I consent to Compleo Health contacting me about my enquiry <span style={{color: '#ef4444', fontWeight: '900', fontSize: '18px'}}>*</span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={createContactMutation.isPending}
              className="w-full bg-compleo-teal hover:bg-compleo-yellow text-white hover:text-compleo-deep-teal font-bold text-lg py-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              {createContactMutation.isPending ? 'Sending enquiry...' : 'Send enquiry'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
