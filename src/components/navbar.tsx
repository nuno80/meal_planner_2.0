"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Importalo se vuoi usarlo per lo stile attivo
import { useEffect, useState } from "react";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();
  const pathname = usePathname(); // Puoi usarlo per lo stile del link attivo se vuoi

  // Close menu when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuAndToggle = () => { // Funzione helper per chiudere il menu
    setIsMenuOpen(false);
  };


  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold" onClick={closeMenuAndToggle}>
            <span className="text-xl">MyApp</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-primary" : ""}`}
            >
              Home
            </Link>
            {/* MODIFICATO: Il link "Ricette" ora punta a /recipe-showcase */}
            <Link
              href="/recipe-showcase" 
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/recipe-showcase" || pathname?.startsWith("/recipes/") ? "text-primary" : ""}`}
            >
              Ricette
            </Link>
            {/* Se vuoi un link separato per lo showcase dei componenti, puoi aggiungerlo: */}
            {/*
            <Link
              href="/recipe-showcase"
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/recipe-showcase" ? "text-primary" : ""}`}
            >
              Components Showcase
            </Link>
            */}
            <Link
              href="/features"
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/features" ? "text-primary" : ""}`}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/pricing" ? "text-primary" : ""}`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/about" ? "text-primary" : ""}`}
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/dashboard" ? "text-primary" : ""}`}
            >
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal" />
              <SignUpButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <SignedOut>
            <SignInButton mode="modal" />
            <SignUpButton mode="modal" />
          </SignedOut>

          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && ( // Aggiunto isMobile per chiarezza
        <div className="md:hidden"> {/* Rimosso container e px, se la navbar genitore li gestisce */}
          <div className="flex flex-col space-y-4 border-t px-6 py-4"> {/* Aggiunto border-t e padding */}
            <Link
              href="/"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${pathname === "/" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              onClick={closeMenuAndToggle}
            >
              Home
            </Link>
            {/* MODIFICATO: Link "Ricette" nel menu mobile */}
            <Link
              href="/recipe-showcase"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${pathname === "/recipe-showcase" || pathname?.startsWith("/recipes/") ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              onClick={closeMenuAndToggle}
            >
              Ricette
            </Link>
            {/* Se vuoi un link separato per lo showcase: */}
            {/*
            <Link
              href="/recipe-showcase"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${pathname === "/recipe-showcase" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              onClick={closeMenuAndToggle}
            >
              Components Showcase
            </Link>
            */}
            <Link
              href="/features"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${pathname === "/features" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              onClick={closeMenuAndToggle}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${pathname === "/pricing" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              onClick={closeMenuAndToggle}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${pathname === "/about" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              onClick={closeMenuAndToggle}
            >
              About
            </Link>
             <Link
              href="/dashboard" // Aggiunto anche il link dashboard al menu mobile se necessario
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${pathname === "/dashboard" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              onClick={closeMenuAndToggle}
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}