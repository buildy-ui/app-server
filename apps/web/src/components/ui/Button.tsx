import type { ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import {
  spacingVariants,
  roundedVariants,
  shadowVariants,
  layoutVariants,
  buttonSizeVariants,
  buttonStyleVariants,
  buttonContentAlignVariants,
  type VariantSpacingProps,
  type RoundedProps,
  type ShadowProps,
  type VariantLayoutProps,
  type ButtonSizeProps,
  type ButtonStyleProps,
  type ButtonContentAlignProps
} from "../../variants";

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<VariantSpacingProps, 'm' | 'mx' | 'my'>,
    RoundedProps,
    ShadowProps,
    Pick<VariantLayoutProps, 'w'>,
    ButtonSizeProps,
    ButtonStyleProps,
    ButtonContentAlignProps {
  children: ReactNode;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  mr?: 1 | 2 | 3 | 4 | 0;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className,
    variant = 'default',
    size = 'default',
    rounded = 'lg',
    shadow,
    loading = false,
    disabled = false,
    // Spacing props  
    m, mx, my,
    mr = 1,
    // Layout props
    w,
    // Content props
    leftSection,
    rightSection,
    contentAlign,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        data-class="button"
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          buttonSizeVariants({ size }),
          buttonStyleVariants({ variant }),
          buttonContentAlignVariants({ contentAlign }),
          spacingVariants({ m, mx, my }),
          roundedVariants({ rounded }),
          shadowVariants({ shadow }),
          layoutVariants({ w }),
          `mr-${mr}`,
          loading && 'cursor-wait',
          className
        )}
        {...props}
      >
        {loading && (
          <div 
            data-class="button-loading-spinner"
            className={`mr-${mr} h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent`} 
          />
        )}
        {!loading && leftSection && (
          <span data-class="button-left-section" className={`mr-${mr}`}>
            {leftSection}
          </span>
        )}
        {children}
        {!loading && rightSection && (
          <span data-class="button-right-section" className={`ml-${mr}`}>
            {rightSection}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button"; 