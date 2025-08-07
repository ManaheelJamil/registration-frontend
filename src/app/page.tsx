"use client";

import SignupForm from "../components/ui/registration";

export default function DemoPage() {
  return (
    <div className="flex justify-center items-center p-5 bg-gray-50 dark:bg-gray-900">
      <SignupForm />
    </div>
  );
}