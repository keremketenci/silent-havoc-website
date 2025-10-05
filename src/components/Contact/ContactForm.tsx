"use client"

// translations
import { useTranslations } from 'next-intl';

// React
import { useState } from "react";

// form
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// components ui
import { toast } from "sonner"
import { Input } from "@/components/shadcn/ui/input"
import { Textarea } from "@/components/shadcn/ui/textarea"
import { ButtonDecode } from "@/components/ui/button/ButtonDecode"
import { LoaderGlitch } from "@/components/ui/loader/LoaderGlitch";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn/ui/form"

// components
import { CardHighlighted } from "@/components/ui/card/CardHighlighted";

// Define the schema for form validation
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    surname: z.string().min(2, {
        message: "Surname must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    subject: z.string().min(3, {
        message: "Subject must be at least 3 characters.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
})

// Define types for form values
type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
    const t = useTranslations('Contact');
    const t2 = useTranslations("Toast");

    // Initialize the form with react-hook-form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    // State for handling loading and response messages
    const [loading, setLoading] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");

    // Handle form submission
    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        setResponseMessage(""); // Clear previous messages

        try {
            const response = await fetch('/api/contactForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender: { name: data.name + " " + data.surname, address: data.email },
                    recipients: [{ address: 'silent.havoc.istanbul@gmail.com' }],
                    subject: data.subject,
                    message: data.message,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                form.reset();
                toast(`${t2('ContactForm.Email.success')}`);
                setResponseMessage("Email sent successfully!");
            } else {
                toast(`${t2('ContactForm.Email.failed')}.`);
                setResponseMessage("Failed to send email. Please try again later.");
            }
        } catch (error) {
            toast(`${t2('ContactForm.Email.failed')}.`);
            console.error("Error sending email:", error);
            setResponseMessage("An error occurred while sending the email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CardHighlighted
            cardType='Form'
            cardClass={`bg-card text-white border border-slate-800`}
            content=
            {
                <div className={`bg-card text-white rounded-3xl p-4 w-full`}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 space-x-0">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <FormItem className="cursor-target">
                                        <div className="flex justify-between items-end space-x-4">
                                            <FormLabel className="ml-1 md:cursor-none">{`${t('Form.label.firstName')}`}</FormLabel>

                                            <div className='text-right'>
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input className={`bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                                                placeholder={`${t('Form.input-placeholder.firstName')}`} {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {`${t('Form.input-description.firstName')}`}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="surname"
                                render={({ field, fieldState }) => (
                                    <FormItem className="cursor-target">
                                        <div className="flex justify-between items-end space-x-4">
                                            <FormLabel className="ml-1 md:cursor-none">{`${t('Form.label.lastName')}`}</FormLabel>
                                            <div className='text-right'>
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input className={`bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                                                placeholder={`${t('Form.input-placeholder.lastName')}`} {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {`${t('Form.input-description.lastName')}`}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <FormItem className="cursor-target">
                                        <div className="flex justify-between items-end space-x-4">
                                            <FormLabel className="ml-1 md:cursor-none">{`${t('Form.label.email')}`}</FormLabel>
                                            <div className='text-right'>
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input className={`bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                                                placeholder={`${t('Form.input-placeholder.email')}`} type="email" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {`${t('Form.input-description.email')}`}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field, fieldState }) => (
                                    <FormItem className="cursor-target">
                                        <div className="flex justify-between items-end space-x-4">
                                            <FormLabel className="ml-1 md:cursor-none">{`${t('Form.label.subject')}`}</FormLabel>
                                            <div className='text-right'>
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input className={`bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                                                placeholder={`${t('Form.input-placeholder.subject')}`} {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {`${t('Form.input-description.subject')}`}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field, fieldState }) => (
                                    <FormItem className="cursor-target">
                                        <div className="flex justify-between items-end space-x-4">
                                            <FormLabel className="ml-1 md:cursor-none">{`${t('Form.label.message')}`}</FormLabel>
                                            <div className='text-right'>
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Textarea className={`bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                                                placeholder={`${t('Form.input-placeholder.message')}`} {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {`${t('Form.input-description.message')}`}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col items-center">
                                <div>
                                    {loading ? (
                                        <div className="p-2">
                                            <LoaderGlitch text={`${t('Form.Button.sending')}`} />
                                        </div>
                                    ) : (
                                        <ButtonDecode text={`${t('Form.Button.submit')}`} />
                                    )}
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            }
        />

    );
}