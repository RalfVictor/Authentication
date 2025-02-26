"use client";

import { useUserContext } from "@/context/UserContext";

export default function Home() {
  const user = useUserContext();
  console.log(user);
  return <main></main>;
}
