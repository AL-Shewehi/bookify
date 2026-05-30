import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="wrapper pt-28 mb-10  md:mb-16">
      <div className="library-hero-card">
        <div className="library-hero-content">
          <div className="library-hero-text">
            <p className="text-[15px] font-semibold text-(--text-secondary)">
              SpokenPages
            </p>
            <h1 className="library-hero-title">Your Library</h1>
            <p className="library-hero-description">
              Convert your books into interactive AI conversations. Listen,
              learn, and discuss your favorite reads.
            </p>
            <button className="library-cta-primary" type="button">
              <span className="text-lg leading-none">+</span>
              Add new book
            </button>
          </div>

          <div className="library-hero-illustration-desktop">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books and globe illustration"
              width={420}
              height={260}
              className="h-auto w-full max-w-105"
              priority
            />
          </div>

          <div className="library-hero-illustration">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books and globe illustration"
              width={420}
              height={260}
              className="h-auto w-full max-w-105"
              priority
            />
          </div>

          <div className=" w-full flex-1 items-center justify-center hidden lg:flex lg:justify-end">
            <ul className="library-steps-card">
              <li className="library-step-item">
                <span className="library-step-number">1</span>
                <div>
                  <p className="library-step-title">Upload PDF</p>
                  <p className="library-step-description">Add your book file</p>
                </div>
              </li>
              <li className="library-step-item">
                <span className="library-step-number">2</span>
                <div>
                  <p className="library-step-title">AI Processing</p>
                  <p className="library-step-description">
                    We analyze the content
                  </p>
                </div>
              </li>
              <li className="library-step-item">
                <span className="library-step-number">3</span>
                <div>
                  <p className="library-step-title">Voice Chat</p>
                  <p className="library-step-description">Discuss with AI</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      
    </section>
  );
}
