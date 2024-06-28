import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h3>LandingPage</h3>
      </section>

      <Footer />
    </main>
  );
}
