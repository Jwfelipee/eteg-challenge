import "./Input.style.css";

const sizesInput = {
  small: "input--small",
  medium: "input--medium",
  large: "input--large",
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  sizes?: keyof typeof sizesInput;
  errorMessage?: string;
}

export function Input({
  className,
  sizes = "medium",
  label,
  errorMessage,
  ...rest
}: InputProps) {
  return (
    <div className={`input-container ${errorMessage && "error-text"}`}>
      <label style={{ visibility: !label ? "hidden" : "visible" }}>
        {label ?? "hidden"}
      </label>
      <input
        className={`input ${errorMessage && "error-text error"} ${
          sizesInput[sizes]
        } ${className}`}
        {...rest}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}

interface BoxInputProps extends InputProps {
  sizeWidth?:
    | "10"
    | "20"
    | "30"
    | "40"
    | "50"
    | "60"
    | "70"
    | "80"
    | "90"
    | "100";
}

export function BoxInput<T extends BoxInputProps>({
  className,
  sizes = "medium",
  sizeWidth = "50",
  ...rest
}: T) {
  const sizesWidthConveted = (sizeWidth: string) => {
    if (sizeWidth === "100") return 100;
    const size = Number(sizeWidth);
    return size - 0.4;
  };

  return (
    <div style={{ width: `${sizesWidthConveted(sizeWidth)}%` }}>
      <Input className={className} sizes={sizes} {...rest} />
    </div>
  );
}
