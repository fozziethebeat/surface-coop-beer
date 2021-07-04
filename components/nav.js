import Link from "next/link";

const links = [
  {
    href: "//github.com/fozziethebeat/surface-coop-beer",
    label: "Github",
  },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav className="text-center">
    <ul className="flex justify-between py-3 px-3">
      <li className="flex px-2 py-4">
        <Link href="/">
          <a className="text-blue-500 no-underline text-sm">Home</a>
        </Link>
      </li>
      <ul className="flex justify-between">
        {links.map(({ key, href, label }) => (
          <li className="flex px-2 py-4" key={key}>
            <Link href={href}>
              <a className="text-blue-500 no-underline text-sm">{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </ul>
  </nav>
);

export default Nav;
