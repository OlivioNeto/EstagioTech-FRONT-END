import { NavLink } from "react-router-dom";
// import imgLogoTechvaga from "../../assets/images/logo_white.png";
// import imgLogoTechvagaWhite from "../../assets/images/logo_techvagas_white.png";
// import imgCpsWhite from "../../assets/images/logo_cps-white.png";
// import imgGovSPWhite from "../../assets/images/logo_govsp_white.png";
import FormCreateAccount from "./components/form-create-account";

export default function Login() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r  lg:flex bg">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium ">
          {/* <img
            src={imgLogoTechvaga}
            alt="logo tech vagas"
            className="h-[4.5rem] w-auto"
          /> */}
        </div>
        <div className="relative z-20 mt-auto">
          <div className="flex items-center justify-center gap-10 space-y-2">
            {/* <img
              src={imgLogoTechvagaWhite}
              alt="logo tech vagas"
              className="h-[4.5rem] w-auto"
            /> */}
            {/* <img
              src={imgCpsWhite}
              alt="logo tech vagas"
              className="h-[4.5rem] w-auto"
            /> */}
            {/* <img
              src={imgGovSPWhite}
              alt="logo tech vagas"
              className="h-[4.5rem] w-auto"
            /> */}
          </div>
        </div>
      </div>
      <div className="mt-8 lg:p-8">
        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
          {/* <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"> */}
          <FormCreateAccount />

          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao clicar em continuar, você concorda com nossos{" "}
            <NavLink
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de serviço
            </NavLink>{" "}
            e{" "}
            <NavLink
              to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade.
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}