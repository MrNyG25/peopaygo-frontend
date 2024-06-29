import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function page() {
  return (
    <main className="flex h-full flex-col items-center p-6 mt-80">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to poepaygo.</strong> This is an app to manage timesheets{" "}
            
          </p>
          <Link
            href="/login"
          >
            <Button type="submit">
              Log in
              <ArrowRightIcon className="w-5 md:w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
