import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <main className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
      <div className="flex flex-col lg:flex-row items-center bg-[#2B2929] dark:bg-slate-800">
        <div>
          <h1 className="text-5xl font-bold">Welcome to our DropBox killer.
          </h1>
            <br /><br />
            <h1>
            Store assets in the cloud.
            </h1>
          <p className="py-10">
            Very easy, very free. 
          </p>

        <Link href="/dashboard" className="flex bg-blue-500 p-5 w-fit my-4">
          Click here and start storing assets!
          <ArrowRight className="ml-10" />
        </Link>
        </div>

        <div className="bg-[#1e1919] dark:bg-slate-800 h-full p-0 lg:p-4">
          <video  loop muted className="rounded-lg my-4">
          <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4" type="video/mp4" />
          </video>

        </div>
      </div>
      <UserButton afterSignOutUrl="/" />

      <Button variant={'ghost'}> test btn</Button>

    </main>
  )
}
