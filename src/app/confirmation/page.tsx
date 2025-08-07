import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

function AlertDialog4() {
  return (
    <AlertDialog>
      <div className="w-[360px] lg:mx-auto mx-5 h-screen flex items-center justify-center  ">
        <div className="h-[250px] space-y-5 bg-gray-200 py-5 px-5 rounded-xl">
          <AlertDialogHeader>
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="size-6 text-green-600" />
            </div>
            <AlertDialogTitle className="text-center ">
              Successfully Submitted
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              <span>
                You’re now enrolled in the Website Development Course. Check
                Discord dashboard for course details and next steps.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link href="/" className="w-full">
              {" "}
              <AlertDialogAction className="w-full bg-[#2563eb] hover:bg-[#2563eb]/90 cursor-pointer">
                Okay
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </div>
      </div>
    </AlertDialog>
  );
}

export default AlertDialog4;
