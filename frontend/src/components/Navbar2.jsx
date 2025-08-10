import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfileDropdown from "./Profileholder";

import { useParams } from "react-router-dom";
("use client");
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Profileholder from "./Profileholder";
import { useRecoilState } from "recoil";
import { searchAtom } from "@/atom";
const Navbar2 = () => {
  const navItems = [
    // {
    //   name: "Features",
    //   link: "#features",
    // },
    // {
    //   name: "Pricing",
    //   link: "#pricing",
    // },
    // {
    //   name: "Contact",
    //   link: "#contact",
    // },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const [search, setsearch] = useRecoilState(searchAtom);
  const [searchData, setsearchData] = useState({ search: "" });
  const handleChange = (e) => {
    setsearchData({ [e.target.name]: e.target.value });
  };
  // console.log(searchData.search);
  const handleSearch = async () => {
    setsearch(searchData.search);
  };

  return (
    <div>
      <div>
        <div className="relative w-full">
          <Navbar>
            {/* Desktop Navigation */}
            <NavBody>
              <NavbarLogo />
              <NavItems items={navItems} />
              <div className="flex items-center gap-3 ">
                <NavbarButton>
                  <input
                    type="text"
                    placeholder="Search Your Products Here"
                    name="search"
                    value={searchData.search}
                    onChange={handleChange}
                    className="outline-none"
                  />
                </NavbarButton>
                <NavbarButton
                  variant="primary"
                  className="bg-blue-600 text-white rounded-4xl px-5 py-2"
                >
                  <button onClick={handleSearch}>Search</button>
                </NavbarButton>
                {!token ? (
                  <>
                    <NavbarButton
                      variant="primary"
                      className="bg-blue-600 text-white rounded-4xl px-5 py-2"
                      href="/Signup"
                    >
                      Signup
                    </NavbarButton>
                    <NavbarButton
                      variant="primary"
                      className="bg-blue-600 text-white rounded-4xl px-5 py-2"
                      href="/Login"
                    >
                      Login
                    </NavbarButton>
                  </>
                ) : (
                  <>
                    <NavbarButton
                      variant="primary"
                      className="bg-blue-600 text-white rounded-4xl px-5 py-2"
                      href="/addShop"
                    >
                      Add Shop
                    </NavbarButton>
                    <div className="mt-1 relative">
                      <ProfileDropdown />
                    </div>
                  </>
                )}
              </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </MobileNavHeader>

              <MobileNavMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
              >
                {navItems.map((item, idx) => (
                  <a
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-neutral-600 dark:text-neutral-300"
                  >
                    <span className="block">{item.name}</span>
                  </a>
                ))}
                <div className="flex w-full flex-col gap-4">
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Book a call
                  </NavbarButton>
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </div>
      </div>{" "}
    </div>
  );
};

export default Navbar2;
