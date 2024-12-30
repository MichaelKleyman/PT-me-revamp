import { Stack } from "@mui/material";
import { TopBar } from "../TopBar/TopBar";
import { LandingPageSectionOne } from "./LandingPageSectionOne";
import { LandingPageSectionTwo } from "./LandingPageSectionTwo";
import { LandingPageSectionMiddle } from "./LandingPageSectionMiddle";
import { useRef } from "react";
import { MenuRef, MenuRefs } from "../../utils/types/types";
import { LandingPageFooter } from "./LandingPageFooter";

export const LandingPage = () => {
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const menuRefs: MenuRefs = {
    Services: servicesRef,
  };

  const handleClick = (ref: MenuRef) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Stack sx={{ background: "transparent" }}>
      <TopBar menuRefs={menuRefs} handleClick={handleClick} />
      <Stack alignItems='center'>
        {/* First section */}
        <Stack>
          <LandingPageSectionOne />
        </Stack>
        {/* Middle section */}
        <LandingPageSectionMiddle />
        {/* Second section */}
        <Stack ref={servicesRef}>
          <LandingPageSectionTwo />
        </Stack>
        <LandingPageFooter />
      </Stack>
    </Stack>
  );
};
