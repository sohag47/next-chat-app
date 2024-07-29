"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import RSidebar from "@/components/sidebar";

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    tag: string;
    item: string;
  };
}) {
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }

  return (
    <div>
      <Navbar
        info="Elecrohome International University Central Library"
        service="Library Management"
      />
      <section className="flex dark:bg-[#2c2c2c]">
        <RSidebar sidebar="user" />
        <main className="min-h-[84vh] w-full mt-20 px-5 ">{children}</main>
      </section>
      <Footer styles="" />
    </div>
  );
}
