import { SvgIconComponent } from "@mui/icons-material";

export type TNavSectionProps = {
  title: string;
  children: React.ReactNode;
};

export type TNavItemProps = {
  href: string;
  icon: SvgIconComponent;
  children: React.ReactNode;
};
