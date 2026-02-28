import { cva } from "class-variance-authority";
import { cn } from "../utils/cn";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "icon"
}

export default function Button({ className, children, variant, ...props }: ButtonProps) {

    return <button {...props} className={cn(buttonVariants({ variant }), className)}>
        {children}
    </button>;
}

const buttonVariants = cva(
    'rounded-md font-semibold border-1 border-black hover:opacity-50 hover:cursor-pointer',
    {
        variants: {
            variant: {
                primary: 'py-2 px-12 bg-gradient-to-r from-black to-white text-black',
                secondary: 'py-2 px-12 bg-gradient-to-r from-black to-white text-white',
                icon: 'border-none '
            }
        },
        defaultVariants: {
            variant: 'primary'
        }
    }
)