
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsCodeSlash, BsDribbble, BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import logo from '../assets/log.jpg';



export function FooterSection() {
  return (
    <div className="">
      <Footer container className="rounded-b-none md:px-24">
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <FooterBrand
                href="https://flowbite.com"
                src={logo}
                alt="PixelPen Logo"
                name="PixelPen"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <FooterTitle title="about" />
                <FooterLinkGroup col>
                  <FooterLink href="#">PixelPen</FooterLink>
                  <FooterLink href="#">Tailwind CSS</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Follow us" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Github</FooterLink>
                  <FooterLink href="#">Discord</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Legal" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Privacy Policy</FooterLink>
                  <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="#" by="PixelPen™" year={2022} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="https://www.facebook.com/shakil.ahmed.billal" icon={BsFacebook} />
              <FooterIcon href="https://codepen.io/shakil-ahmed-billal" icon={BsCodeSlash} />
              <FooterIcon href="https://bd.linkedin.com/in/shakil-ahmed-billal" icon={BsLinkedin} />
              <FooterIcon href="https://github.com/shakil-ahmed-billal" icon={BsGithub} />
              <FooterIcon href="https://xhakil.vercel.app" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}
