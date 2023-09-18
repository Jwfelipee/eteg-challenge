import { Link } from "react-router-dom";
import { ISizes, sizes } from "./sizes";

interface ButtonLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  size?: ISizes;
  to: string;
}

export function LinkButton({
  children,
  className,
  size = "medium",
  ...rest
}: ButtonLinkProps) {
  return (
    <>
      <Link className={`button-custom ${sizes[size]} ${className}`} {...rest}>
        {children}
      </Link>
    </>
  );
}
