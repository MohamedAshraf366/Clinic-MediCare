import { Bell, Languages, Moon, Search, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useI18n } from "@/lib/i18n";

export function TopBar() {
  const { t, lang, setLang, theme, setTheme } = useI18n();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("top.search")}
          className="h-10 rounded-lg border-border bg-muted/40 ps-9 focus-visible:bg-background"
        />
      </div>

      <div className="ms-auto flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          aria-label={t("top.language")}
        >
          <Languages className="h-4 w-4" />
          <span className="text-xs font-semibold">{lang === "en" ? "AR" : "EN"}</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={t("top.theme")}
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
          aria-label={t("top.notifications")}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute end-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>

        <div className="ms-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          MA
        </div>
      </div>
    </header>
  );
}
