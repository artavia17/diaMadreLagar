import Image from "next/image";
import LagarLogoColor from '../assets/img/lagar_logo_color.svg';
import FacebookIcon from '../assets/img/facebook.svg';
import InstagramIcon from '../assets/img/instagram.svg';

const FooterComponent = () => {

    return (
        <footer>
            <section className="responsive-box">
                <Image  className="logo" src={LagarLogoColor.src} alt="El Lagar" width={LagarLogoColor.width} height={LagarLogoColor.height}/>
                <section className="social">
                    <a href="https://www.facebook.com/ellagardesampa" target="_black" aria-label="Ir a facebook">
                        <Image  className="logo" src={FacebookIcon.src} alt="El Lagar" width={FacebookIcon.width} height={FacebookIcon.height}/>
                    </a>
                    <a href="https://www.instagram.com/ellagardelhogar" target="_black" aria-label="Ir a instagram">
                        <Image  className="logo" src={InstagramIcon.src} alt="El Lagar" width={InstagramIcon.width} height={InstagramIcon.height}/>
                    </a>
                </section>
            </section>
        </footer>
    )

}

export default FooterComponent;