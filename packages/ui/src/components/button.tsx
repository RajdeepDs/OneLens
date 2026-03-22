"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"
import { cloneElement, type ComponentPropsWithoutRef, type ReactElement, type ReactNode } from "react"

import { cn } from "@onelens/ui/lib/utils"
import { Kbd, KbdGroup } from "./kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-[13px] font-normal whitespace-nowrap outline-none select-none transition-transform duration-160 ease-out focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground transition-colors duration-150 ease-[var(--ease-out)] [a]:hover:bg-primary/80",
        outline:
          "border border-border bg-background transition-colors duration-150 ease-[var(--ease-out)] hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-white dark:bg-gray-2 shadow-xs inset-shadow text-secondary-foreground transition-colors duration-150 ease-[var(--ease-out)] hover:bg-gray-2 aria-expanded:bg-white aria-expanded:text-secondary-foreground",
        ghost:
          "text-muted-foreground transition-colors duration-150 ease-[var(--ease-out)] hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:text-alpha-8 dark:hover:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive transition-colors duration-150 ease-[var(--ease-out)] hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 transition-colors duration-150 ease-[var(--ease-out)] hover:underline",
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


type Shortcut = string | string[]

/** Strips blank entries and returns undefined if nothing remains. */
function normalizeShortcut(shortcut?: Shortcut): string | string[] | undefined {
  if (Array.isArray(shortcut)) {
    const values = shortcut.map((v) => v.trim()).filter((v) => v.length > 0)
    return values.length > 0 ? values : undefined
  }
  if (typeof shortcut === "string") {
    const value = shortcut.trim()
    return value.length > 0 ? value : undefined
  }
  return undefined
}

function renderShortcut(shortcut?: Shortcut, isLink: boolean = false): ReactNode {
    const normalized = normalizeShortcut(shortcut)
    if (!normalized) return null

    if (Array.isArray(normalized)) {
        return (
            <KbdGroup className="flex items-center gap-1.5 text-gray-1" data-shortcut="true">
                {normalized.map((value) => (
                    // Shortcuts are unique display strings; value alone is a stable key.
                    <Kbd key={value}>
                        <span className="mt-px uppercase">{value}</span>
                    </Kbd>
                ))}
            </KbdGroup>
        )
    }

    return (
        <Kbd className={cn("text-gray-10 uppercase", !isLink && "pointer-events-none absolute top-1/2 right-2.5 size-5 -translate-y-1/2")} data-shortcut="true">
            <span>{normalized}</span>
        </Kbd>
    )
}


interface MaybeTooltipProps {
  tooltip?: ReactNode
  children: ReactElement
}

function MaybeTooltip({ tooltip, children }: MaybeTooltipProps) {
  if (!tooltip) return <>{children}</>
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  shortcut?: Shortcut
  tooltip?: ReactNode
  icon?: ReactElement<{ className?: string }>
}

function Button({ className, variant = "default", size = "default", shortcut, tooltip, icon, children, ...props }: ButtonProps) {
  const normalizedShortcut = normalizeShortcut(shortcut)

  return (
    <MaybeTooltip tooltip={tooltip}>
      <ButtonPrimitive
        data-slot="button"
        data-icon={icon ? true : undefined}
        className={cn(
          buttonVariants({ variant, size, className }),
          normalizedShortcut && "relative",
        )}
        {...props}
      >
        {icon && cloneElement(icon, {
          className: cn("pointer-events-none absolute top-1/2 left-2.5 size-5 -translate-y-1/2", icon.props.className),
        })}
        <span>{children}</span>
        {renderShortcut(normalizedShortcut)}
      </ButtonPrimitive>
    </MaybeTooltip>
  )
}

Button.displayName = "Button"


interface SharedLinkProps extends VariantProps<typeof buttonVariants> {
  shortcut?: Shortcut
  tooltip?: ReactNode
  className?: string
  children: ReactNode
}


export type ButtonLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> &
  SharedLinkProps

  function ButtonLink({
    children,
    className,
    shortcut,
    tooltip,
    size = "default",
    variant = "default",
    ...props
  }: ButtonLinkProps) {
    const normalizedShortcut = normalizeShortcut(shortcut)
    return (
      <MaybeTooltip tooltip={tooltip}>
        <Link
          data-slot="button-link"
          className={cn(
              buttonVariants({ variant, size, className }),
              normalizedShortcut && "has-[>kbd]:pr-2"
          )}

          {...props}
        >
          <span>{children}</span>
          {renderShortcut(normalizedShortcut, true)}
        </Link>
      </MaybeTooltip>
    )
  }

ButtonLink.displayName = "ButtonLink"

export { Button, ButtonLink, buttonVariants }
