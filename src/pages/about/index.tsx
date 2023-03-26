import { NextPage } from "next";
import Link from "next/link";

const About: NextPage = () => {
  return (
    <>
      <h1>Sobre</h1>
      <Link href="/">
        Voltar
      </Link>
    </>
  )
}

export default About;