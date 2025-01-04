export const revalidate = 0;

import React from "react";

import PortofolioContent from "@/components/hooks/section/portofolio/PortofolioContent";

import { fetchProjects } from "@/utils/lib/project/FetchProject";

import { portofolioData } from "@/components/data/Portofolio";

import Image from "next/image";

export default async function Portofolio() {
  const projects = await fetchProjects();
  return (
    <section>
      <h1>Hallo</h1>
      {
        projects?.map((item,index) => {
          return(
            <div className="box" key={index}>
              <h1>{item?.title}</h1>
              {
                item?.icons?.map((icon, iconIndex) => {
                  return (
                    <div key={iconIndex}>
                      <Image src={icon} alt={"Tech Stack"} width={40} height={40} />
                    </div>
                  );
                })  
              }
            </div>
          )
        })
      }
    </section>
  );
}

