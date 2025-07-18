"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField as FormFieldComponent,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox" 

export interface CrudFormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "textarea" | "file" | "number" | "checkbox";
  description?: string;
  required?: boolean; 
  defaultValue?: any;
}

interface CrudFormProps {
  fields: CrudFormField[]
  submitLabel: string
  onSubmit: (data: any) => void
  isDanger?: boolean
}

export function CrudForm({ fields, submitLabel, onSubmit, isDanger = false }: CrudFormProps) {

  const initialDefaultValues = fields.reduce(
    (acc, field) => {
      if (field.defaultValue !== undefined) {
        acc[field.name] = field.defaultValue;
      } else {
        if (field.type === "number") {
          acc[field.name] = 0;
        } else if (field.type === "checkbox") {
          acc[field.name] = false; 
        } else if (field.type !== "file") { 
          acc[field.name] = "";
        }
      }
      return acc;
    },
    {} as Record<string, any> 
  );

  const formSchema = z.object(
    fields.reduce(
      (acc, field) => {
        let schema: any; 

        if (field.type === "email") {
          schema = z.string().email({ message: "Email inválido" }).or(z.literal(""));
        } else if (field.type === "file") {
          schema = z.any(); 
        } else if (field.type === "number") {
          schema = z.coerce.number({
            invalid_type_error: "O valor deve ser um número.",
          })
            .min(0, { message: "O coeficiente de peso deve estar entre 0 e 1." })
            .max(1, { message: "O coeficiente de peso deve estar entre 0 e 1." });
        } else if (field.type === "checkbox") {
          schema = z.boolean(); 
        }
        else {
          schema = z.string();
        }

        if (field.required) {
          if (field.type === "text" || field.type === "textarea" || field.type === "password") {
            schema = schema.min(1, { message: `${field.label} é obrigatório.` });
          }
        }

        acc[field.name] = schema;
        return acc;
      },
      {} as Record<string, z.ZodTypeAny>, 
    ),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialDefaultValues,
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormFieldComponent
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "textarea" ? (
                    <Textarea {...formField} placeholder={field.label} />
                  ) : field.type === "file" ? (
                    <Input
                      type="file"
                      onChange={(e) => {
                        formField.onChange(e.target.files?.[0] || null);
                      }}
                    />
                  ) : field.type === "number" ? (
                    <Input
                      type="number"
                      min={0}
                      max={1}
                      step={0.01}
                      {...formField}
                      value={formField.value === 0 ? '' : formField.value} 
                      onChange={(e) => formField.onChange(e.target.value === '' ? null : Number(e.target.value))}
                      placeholder={field.label}
                    />
                  ) : field.type === "checkbox" ? ( 
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={field.name}
                        checked={formField.value} 
                        onCheckedChange={formField.onChange}
                      />
                      <FormLabel htmlFor={field.name} className="!mt-0 cursor-pointer">
                        {field.label}
                      </FormLabel>
                    </div>
                  ) : (
                    <Input
                      type={field.type}
                      {...formField}
                      placeholder={field.label}
                    />
                  )}
                </FormControl>
                {field.description && <FormDescription>{field.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" variant={isDanger ? "destructive" : "default"}>
          {submitLabel}
        </Button>
      </form>
    </Form>
  )
}

export { FormFieldComponent as FormField }