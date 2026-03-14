"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@onelens/ui/lib/utils"
import { Kbd, KbdGroup } from "./kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { Fragment } from "react/jsx-runtime"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-[13px] font-normal whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-white dark:bg-gray-2 shadow-xs inset-shadow text-secondary-foreground hover:bg-gray-2 aria-expanded:bg-white aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted text-muted-foreground hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:text-alpha-8 dark:hover:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
    shortcut,
  tooltip,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & { shortcut?: string | string[], tooltip?: string }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
          {...props}
          render={(renderProps) => {
            const {
              children,
              className: renderClassName,
              ...rest
            } = renderProps

            const normalizedShortcut = Array.isArray(shortcut)
              ? shortcut
                  .map((value) => value.trim())
                  .filter((value) => value.length > 0)
              : typeof shortcut === "string"
                ? shortcut.trim()
                : undefined

            const hasShortcut = Array.isArray(normalizedShortcut)
              ? normalizedShortcut.length > 0
              : Boolean(normalizedShortcut)

            const shortcutMarkup = !hasShortcut
              ? null
              : Array.isArray(normalizedShortcut) ? (
                <KbdGroup className="flex items-center gap-1.5 text-muted-foreground" data-shortcut="true">
                  {normalizedShortcut.map((value, index) => (
                    <Kbd key={`${value}-${index}`}>
                      <span className="mt-px">{value}</span>
                    </Kbd>
                  ))}
                </KbdGroup>
              ) : (
                <Kbd className="text-muted-foreground" data-shortcut="true">
                  <span>{normalizedShortcut}</span>
                </Kbd>
              )
            const shouldRenderShortcut = Boolean(shortcutMarkup)
            const buttonContent = (
              <button
                className={cn(
                  renderClassName,
                  "inline-flex items-center gap-2 leading-tight has-data-[shortcut=true]:pr-2",
                  shouldRenderShortcut && "justify-between"
                )}
                {...rest}
              >
                <span className="inline-flex items-center gap-1.5 leading-tight">
                  {children}
                </span>
                {shouldRenderShortcut && (
                  <Fragment

                  >
                    {shortcutMarkup}
                  </Fragment>
                )}
              </button>
            )

            if (!tooltip) return buttonContent

            return (
              <Tooltip>
                <TooltipTrigger render={buttonContent} />
                <TooltipContent>{tooltip}</TooltipContent>
              </Tooltip>
            )
          }}
    />
  )
}

export { Button, buttonVariants }
