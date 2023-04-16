import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className=" font-poppins">
      <Nav />
      <main>{children}</main>
    </div>
  );
}
