"use client";

import React, { useState, useEffect } from "react";

import AboutClient from "@/components/hooks/section/about/AboutClient";

import { subscribeToSkills } from "@/utils/lib/skills/FetchSkills";

import { subscribeToAbout } from "@/utils/lib/about/FetchAbout";

export default function About() {
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToSkills(setSkills);
    const unsubscribeAbout = subscribeToAbout(setAbout);

    return () => {
      unsubscribe();
      unsubscribeAbout();
    };
  }, []);

  return <AboutClient skills={skills} about={about} />;
}
