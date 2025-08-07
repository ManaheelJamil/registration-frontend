"use client";

import * as React from "react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

export default function SignupForm() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    student: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    student: "",
    submit: "",
  });

  const [loading, setLoading] = useState(false); // ✅ Loading state
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", submit: "" });
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!form.firstname.trim()) newErrors.firstname = "First name is required.";
    if (!form.lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.phonenumber.trim()) newErrors.phonenumber = "Phone number is required.";
    if (!form.student.trim()) newErrors.student = "This field is required.";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors({ ...errors, ...validationErrors });
      return;
    }

    setLoading(true); // ✅ Start loader

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 409) {
        setErrors({ ...errors, submit: "Email is already in use." });
        return;
      }

      if (!res.ok) {
        throw new Error("Something went wrong.");
      }

      router.push("/confirmation");
    } catch (err) {
      setErrors({ ...errors, submit: "Failed to register. Try again." });
    } finally {
      setLoading(false); // ✅ Stop loader
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg pb-0">
          <CardHeader className="flex flex-col items-center space-y-1.5 pb-4 pt-6">
            <div className="space-y-0.5 flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-foreground">Registered Form</h2>
              <p className="text-muted-foreground mt-4 text-center">
                Welcome! Enroll Yourself in ClickToCode BootCamp
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            <div className="flex items-center gap-5">
              <div className="space-y-4 w-full">
                <Label htmlFor="firstname">First Name*</Label>
                <Input name="firstname" id="firstname" onChange={handleChange} />
                {errors.firstname && <p className="text-red-500 text-xs">{errors.firstname}</p>}
              </div>
              <div className="space-y-4 w-full">
                <Label htmlFor="lastname">Last Name*</Label>
                <Input name="lastname" id="lastname" onChange={handleChange} />
                {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address*</Label>
              <Input id="email" name="email" type="email" onChange={handleChange} />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div className="space-y-4">
              <Label htmlFor="student">Are you a Student OR Professional?</Label>
              <Input name="student" id="student" onChange={handleChange} />
              {errors.student && <p className="text-red-500 text-xs">{errors.student}</p>}
            </div>
            <div className="space-y-4">
              <Label htmlFor="student mb-2">Use these accounts to proceed with your payment.</Label>
              <div className="flex items-center gap-5 mt-3">
                <div className="flex items-center gap-2">
                  <Image src="/easypaisa.jpg" alt="img" width="20" height="20" />
                  <h1 className="text-xs">03303849279</h1>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/jazzcash.png" alt="img" width="30" height="30" />
                  <h1 className="text-xs">03303849279</h1>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Image src="/bank.png" alt="img" width="20" height="20" />
                <h1 className="text-xs">
                  Bank Name: HBL
                  <br />
                  Account Title: TAHIRA JAMIL
                  <br />
                  Account Number: 16427901750899
                </h1>
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="phonenumber">Phone Number*</Label>
              <Input name="phonenumber" id="phonenumber" onChange={handleChange} />
              {errors.phonenumber && <p className="text-red-500 text-xs">{errors.phonenumber}</p>}
            </div>

            {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-primary cursor-pointer text-primary-foreground"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
