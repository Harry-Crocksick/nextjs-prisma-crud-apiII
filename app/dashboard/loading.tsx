import Image from "next/image";

export default function Loading() {
  return (
    <section className="min-h-screen w-full grid place-content-center">
      <Image
        src={"/spinner.gif"}
        alt="Spinner"
        width={65}
        height={65}
        className="object-contain pointer-events-none"
      />
    </section>
  );
}
