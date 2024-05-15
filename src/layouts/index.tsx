
type Props = {
  children: React.ReactNode;
};

function DefaultLayout({ children }: Props) {
  return (
    <main className="flex flex-col dark:bg-darkBackground">
      {/* <Navbar /> */}
      {/* <Toaster /> */}
      <section className="px-8 max-md:px-8 lg:px-16 py-4 mb-4 ">
        {children}
      </section>
    </main>
  );
}

export default DefaultLayout;
