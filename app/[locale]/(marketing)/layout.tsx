import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { UtilityStrip } from "./_components/utility-strip";

type Props = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: Props) {
  return (
    <>
      <UtilityStrip />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
