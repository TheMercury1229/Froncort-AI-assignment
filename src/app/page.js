import { LogoWizard } from "@/components/home/logo-wizard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:py-6 lg:py-8 md:px-12 lg:px-24">
      <LogoWizard />
    </main>
  );
}
