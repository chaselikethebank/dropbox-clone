import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <main className="">
      <h1>drop bucket</h1>
      <UserButton afterSignOutUrl="/"/>

      <Button variant={"ghost"}> test btn</Button>

    </main>
  )
}
