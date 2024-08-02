import FooterComponent from "@/components/FooterComponent";
import FormComponent from "@/components/home/FormComponent";
import HeaderComponent from "@/components/home/HeaderComponent";

export default function Home() {
  return (
    <>
      <body className="home">
        <HeaderComponent/>
        
        <FooterComponent/>
      </body>
    </>
  );
}
