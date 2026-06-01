import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  let books: Awaited<ReturnType<typeof getAllBooks>>["data"] = [];
  let loadError = false;

  try {
    const bookResults = await getAllBooks();
    if (bookResults?.success === true) {
      books = bookResults.data ?? [];
    } else {
      loadError = true;
    }
  } catch {
    loadError = true;
  }

  return (
    <main className="wrapper container">
      <HeroSection />

      {loadError ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            Could not load books
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Something went wrong while fetching your library.
          </p>
          <a
            href="/"
            className="mt-2 text-sm font-medium text-[#663820] underline underline-offset-4 hover:opacity-75 transition-opacity"
          >
            Try again
          </a>
        </div>
      ) : (
        <div className="library-books-grid">
          {books.map((book) => (
            <BookCard
              key={book._id}
              title={book.title}
              author={book.author}
              coverURL={book.coverURL}
              slug={book.slug}
            />
          ))}
        </div>
      )}
    </main>
  );
}
