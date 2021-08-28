import React from "react";
import { Features } from "./features";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { Instruction } from "./instruction.js";
import { Navbar } from "./navbar";
import { Pricing } from "./pricing";

export function LandingPage(props) {
  return (
    <>
      <Hero />
      <Instruction />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}
