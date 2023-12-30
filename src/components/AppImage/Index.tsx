import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import "./main.css";

type Props = {
  src?: string;
  alt?: string;
  ratio?: string; // Tailwindcss aspect ratio
  fit?: "contain" | "cover" | "fill";
  width?: number | undefined;
  height?: number | undefined;
  className?: string;
};

export const AppImage = ({
  src,
  alt,
  ratio = "aspect-square",
  fit = "contain",
  width = undefined,
  height = undefined,
  className = "",
  ...rest
}: Props) => {
  return (
    <>
      <div
        className={`appImage bg-gray-100 ${ratio} ${fit} ${className}`}
        {...rest}
      >
        <LazyLoadImage
          alt={alt}
          height={height}
          src={src}
          width={width}
          effect="blur"
        />
      </div>
    </>
  );
};
