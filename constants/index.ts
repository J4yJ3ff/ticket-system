interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export const navLinks: SidebarLink[] = [
  {
    route: "/",
    label: "Home",
    imgURL: "/assets/icons/home.svg",
  },
  {
    route: "/about",
    label: "About",
    imgURL: "assets/icons/home.svg",
  },
  {
    route: "/buy",
    label: "Buy Ticket",
    imgURL: "assets/icons/home.svg",
  },
];
