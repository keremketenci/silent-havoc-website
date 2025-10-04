"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Input } from "@/components/shadcn/ui/input";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { ButtonDecode } from "@/components/ui/button/ButtonDecode";
import { LoaderGlitch } from "@/components/ui/loader/LoaderGlitch";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/shadcn/ui/form";
import { CardHighlighted } from "@/components/ui/card/CardHighlighted";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";

// ----------------- Validation Schema -----------------
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  surname: z.string().min(2, "Surname must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.object({
    countryCode: z
      .string()
      .min(1, "Country code required")
      .regex(/^\d+$/, "Digits only"),
    number: z
      .string()
      .min(7, "Phone number required")
      .regex(/^\d+$/, "Digits only"),
  }),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  terms: z.boolean().refine((val) => val, "You must accept terms"),
  contactMethod: z.enum(["phone", "email"]),
});

type FormValues = z.infer<typeof formSchema>;

// ----------------- Component -----------------
export function JoinUsForm({ prefillSubject }: { prefillSubject?: string }) {
  const t = useTranslations("Contact");
  const t2 = useTranslations("Toast");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: { countryCode: "", number: "" },
      subject: prefillSubject || "",
      message: "",
      terms: false,
      contactMethod: "phone",
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefillSubject) form.setValue("subject", prefillSubject);
  }, [prefillSubject]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/joinusForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: `${data.name} ${data.surname}`, address: data.email },
          recipients: [{ address: "keremketenci0@gmail.com" }],
          subject: data.subject,
          message: `
            Name: ${data.name} ${data.surname}
            Email: ${data.email}
            Phone: +${data.phone.countryCode} ${data.phone.number}
            Preferred contact method: ${data.contactMethod}
            Message: ${data.message}
            Terms accepted: ${data.terms ? "Yes" : "No"}
          `,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        form.reset();
        toast.success(t2("ContactForm.Email.success"));
      } else {
        toast.error(t2("ContactForm.Email.failed"));
        console.error(result);
      }
    } catch (err) {
      toast.error(t2("ContactForm.Email.failed"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardHighlighted
      cardType="Form"
      cardClass={`bg-card text-white border border-slate-800`}
      content={
        <div className={`bg-card text-white rounded-3xl p-4 w-full`}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 space-x-0"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem className="cursor-target">
                    <div className="flex justify-between items-end space-x-4">
                      <FormLabel className="ml-1">{`${t(
                        "Form.label.firstName"
                      )}`}</FormLabel>

                      <div className="text-right">
                        {fieldState.error && (
                          <FormMessage>{fieldState.error.message}</FormMessage>
                        )}
                      </div>
                    </div>
                    <FormControl>
                      <Input
                        className={`bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                        placeholder={`${t("Form.input-placeholder.firstName")}`}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`${t("Form.input-description.firstName")}`}
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
                      <FormLabel className="ml-1">{`${t(
                        "Form.label.lastName"
                      )}`}</FormLabel>
                      <div className="text-right">
                        {fieldState.error && (
                          <FormMessage>{fieldState.error.message}</FormMessage>
                        )}
                      </div>
                    </div>
                    <FormControl>
                      <Input
                        className={`bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                        placeholder={`${t("Form.input-placeholder.lastName")}`}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`${t("Form.input-description.lastName")}`}
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
                      <FormLabel className="ml-1">{`${t(
                        "Form.label.email"
                      )}`}</FormLabel>
                      <div className="text-right">
                        {fieldState.error && (
                          <FormMessage>{fieldState.error.message}</FormMessage>
                        )}
                      </div>
                    </div>
                    <FormControl>
                      <Input
                        className={`bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                        placeholder={`${t("Form.input-placeholder.email")}`}
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`${t("Form.input-description.email")}`}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <FormItem className="cursor-target">
                    <div className="flex justify-between items-end space-x-4">
                      <FormLabel className="ml-1">{`${t(
                        "Form.label.phone"
                      )}`}</FormLabel>
                      <div className="text-right">
                        {fieldState.error && (
                          <FormMessage>
                            {form.formState.errors.phone?.countryCode
                              ?.message ||
                              form.formState.errors.phone?.number?.message}
                          </FormMessage>
                        )}
                      </div>
                    </div>
                    <FormControl>
                      <div className="flex flex-row space-x-2">
                        <div className="flex flex-row items-center space-x-2">
                          <div className="text-center w-10 p-1.5 rounded-lg border border-slate-800 focus-visible:ring-black ring-offset-slate-800 ">
                            +
                          </div>
                          <Input
                            className={`text-center w-20 bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                            placeholder={`${t(
                              "Form.input-placeholder.countryCode"
                            )}`}
                            type="tel"
                            maxLength={3}
                            value={field.value.countryCode}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "");
                              field.onChange({
                                ...field.value,
                                countryCode: val,
                              });
                            }}
                          />
                        </div>
                        <Input
                          className={`bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                          placeholder={`${t("Form.input-placeholder.phone")}`}
                          type="tel"
                          maxLength={14}
                          value={field.value.number}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            field.onChange({ ...field.value, number: val });
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      {`${t("Form.input-description.phone")}`}
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
                      <FormLabel className="ml-1">{`${t(
                        "Form.label.subject"
                      )}`}</FormLabel>
                      <div className="text-right">
                        {fieldState.error && (
                          <FormMessage>{fieldState.error.message}</FormMessage>
                        )}
                      </div>
                    </div>
                    <FormControl>
                      <Input
                        className={`bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                        placeholder={`${t("Form.input-placeholder.subject")}`}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`${t("Form.input-description.subject")}`}
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
                      <FormLabel className="ml-1">{`${t(
                        "Form.label.equipment"
                      )}`}</FormLabel>
                      <div className="text-right">
                        {fieldState.error && (
                          <FormMessage>{fieldState.error.message}</FormMessage>
                        )}
                      </div>
                    </div>
                    <FormControl>
                      <Textarea
                        className={`bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                        placeholder={`${t("Form.input-placeholder.equipment")}`}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`${t("Form.input-description.equipment")}`}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactMethod"
                render={({ field, fieldState }) => (
                  <FormItem className="">
                    <div className="flex justify-between items-end space-x-4">
                      <FormLabel className="ml-1 cursor-none">{`${t(
                        "Form.label.contactMethod"
                      )}`}</FormLabel>
                      <div className="text-right">
                        {fieldState.error && (
                          <FormMessage>{fieldState.error.message}</FormMessage>
                        )}
                      </div>
                    </div>
                    <FormControl>
                      <div className="flex flex-row space-x-4">
                        <RadioGroup
                          defaultValue="phone"
                          className="flex flex-row gap-8"
                          onValueChange={field.onChange}
                        >
                          <div className="flex items-center gap-3 cursor-target cursor-none p-2">
                            <RadioGroupItem
                              className="cursor-none"
                              value="phone"
                              id="r1"
                            />
                            <FormLabel
                              className="cursor-none"
                              htmlFor="r1"
                            >{`${t("Form.label.methods.phone")}`}</FormLabel>
                          </div>
                          <div className="flex items-center gap-3 cursor-target cursor-none p-2">
                            <RadioGroupItem
                              className="cursor-none"
                              value="email"
                              id="r2"
                            />
                            <FormLabel
                              className="cursor-none"
                              htmlFor="r2"
                            >{`${t("Form.label.methods.email")}`}</FormLabel>
                          </div>
                        </RadioGroup>
                      </div>
                    </FormControl>

                    <FormDescription>
                      {`${t("Form.input-description.contactMethod")}`}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field, fieldState }) => (
                  <FormItem className="">
                    <div className="flex justify-between items-end space-x-4">
                      <FormLabel className="ml-1 cursor-none">{`${t(
                        "Form.label.terms"
                      )}`}</FormLabel>
                      <div className="text-right">
                        {fieldState.error && (
                          <FormMessage>{fieldState.error.message}</FormMessage>
                        )}
                      </div>
                    </div>
                    <FormControl>
                      <div className="flex flex-row space-x-4">
                        <Checkbox
                          id="terms"
                          className={`w-8 h-8 cursor-target cursor-none bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800`}
                          onCheckedChange={(checked: boolean) =>
                            field.onChange(checked)
                          }
                        />
                        <FormLabel className="cursor-none" htmlFor="terms">
                          {`${t("Form.input-placeholder.terms")}`}
                        </FormLabel>
                      </div>
                    </FormControl>

                    <FormDescription>
                      {`${t("Form.input-description.terms")}`}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-center">
                <div>
                  {loading ? (
                    <div className="p-2">
                      <LoaderGlitch text={`${t("Form.Button.sending")}`} />
                    </div>
                  ) : (
                    <ButtonDecode text={`${t("Form.Button.submit")}`} />
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
