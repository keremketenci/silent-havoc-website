"use client";

// translations
import { useTranslations } from "next-intl";

// react
import { useState } from "react";

// form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// components ui
import { toast } from "sonner";
import { LoaderGlitch } from "@/components/ui/loader/LoaderGlitch";
import { Input } from "@/components/shadcn/ui/input";
import { ButtonDecode } from "@/components/ui/button/ButtonDecode";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";

// components
import { CardHighlighted } from "@/components/ui/card/CardHighlighted";

// Define the schema for form validation
const formSchema = z.object({
  email: z.email({
    message: "Invalid email address.",
  }),
});

// Define types for form values
type FormValues = z.infer<typeof formSchema>;

export function SubscribeForm() {
  const t = useTranslations("Subscribe");
  const t2 = useTranslations("Toast");

  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const response = await fetch("/api/subscribeForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (response.ok) {
        form.reset();
        toast(`${t2("Subscribe.Email.success")}`);
      } else {
        toast(`${t2("Subscribe.Email.failed")}.`);
      }
    } catch (error) {
      toast(`${t2("Subscribe.Email.failed")}.`);
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHighlighted
          cardType="Subscribe"
          cardClass={`bg-card text-white border border-slate-800 flex flex-col p-4`}
          title={`${t("title")}`}
          titleClass="text-center text-2xl"
          description={`${t("description")}`}
          descriptionClass="text-center text-lg"
          content={
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="cursor-target">
                  <div className="flex justify-between items-end space-x-4">
                    <FormLabel className="ml-1 md:cursor-none">{`${t(
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
          }
          footer={
            <div>
              {loading ? (
                <div className="p-2">
                  <LoaderGlitch text={`${t("Button.subscribing")}`} />
                </div>
              ) : (
                <ButtonDecode text={`${t("Button.subscribe")}`} />
              )}
            </div>
          }
          footerClass="flex justify-center w-full"
        />
      </form>
    </Form>
  );
}
