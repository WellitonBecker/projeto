"use client";
import { Breadcrumb as BreadcrumbFlowBite } from "flowbite-react";
import link from "next/link";
import { HiHome } from "react-icons/hi";

interface props {
  items: Array<{
    link: string;
    nome: string;
  }>;
}

export default function Breadcrumb({items}: props) {
  return (
    <BreadcrumbFlowBite aria-label="Default breadcrumb example">
      <BreadcrumbFlowBite.Item href="../" icon={HiHome}>
        <p>Home</p>
      </BreadcrumbFlowBite.Item>
      {items.map((item, i) => {
        return (
          <BreadcrumbFlowBite.Item href={item.link} key={i.toString()}>
            {item.nome}
          </BreadcrumbFlowBite.Item>
        );
      })}
    </BreadcrumbFlowBite>
  );
}
