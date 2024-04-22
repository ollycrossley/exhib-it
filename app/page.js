import NavBar from "@/app/components/NavBar";
import HomeNavBar from "@/app/components/HomeNavBar";

export default function Home() {
  return (
      <main>

          <section className={"hero is-fullheight main-hero"}>
              <HomeNavBar/>
              <div className={"hero-body mx-auto has-text-centered"}>
                  <div>
                      <p className={"title is-1 has-text-centered"}>Exhib-it</p>
                      <p className={"subtitle is-3 pt-3"}>Your personal gallery</p>
                  </div>
              </div>
          </section>
      </main>
  );
}
