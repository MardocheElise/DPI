"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  FileText,
  Calendar,
  FlaskConical,
  Shield,
  LogOut,
  ChevronRight,
  Activity,
  ClipboardList,
  PanelLeftClose,
  PanelLeftOpen,
  Stethoscope,
  Pill,
  FolderOpen,
  ImageIcon,
  Microscope,
  MessageSquare,
  CalendarCheck,
  Ambulance,
  Building2,
  Receipt,
  UserPlus,
  DoorOpen,
  ClipboardCheck,
  Wallet,
  Clock3,
  CircleCheckBig,
  BarChart3,
  UserRound,
} from "lucide-react";

type NavChild = { href: string; label: string; icon: React.ElementType };
type NavItem =
  | { href: string; label: string; icon: React.ElementType; children?: never }
  | { href: string; label: string; icon: React.ElementType; children: NavChild[] };

const navItems: NavItem[] = [
  { href: "/", label: "Accueil", icon: Home },
  {
    href: "/accueil/patients",
    label: "Bureau des Entrées",
    icon: DoorOpen,
    children: [
      {
        href: "/accueil/patients",
        label: "Liste Patients",
        icon: UserPlus,
      },
      {
        href: "/accueil/paiements",
        label: "Liste des Paiements",
        icon: Receipt,
      },
      {
        href: "/accueil/referencement-interne",
        label: "Référencement interne",
        icon: Building2,
      },
      {
        href: "/accueil/referencement-externe",
        label: "Hospitalisation externe",
        icon: Ambulance,
      },
    ],
  },
  {
    href: "/caisse/paiement-en-attente",
    label: "Caisse",
    icon: Wallet,
    children: [
      {
        href: "/caisse/paiement-en-attente",
        label: "Paiement en attente",
        icon: Clock3,
      },
      {
        href: "/caisse/paiement-regle",
        label: "Paiement réglé",
        icon: CircleCheckBig,
      },
      {
        href: "/caisse/bilan",
        label: "Bilan Caisse",
        icon: BarChart3,
      },
      {
        href: "/caisse/vue-caissier",
        label: "Vue caissier",
        icon: UserRound,
      },
    ],
  },
  {
    href: "/Gestion_administrative",
    label: "Gestion Administrative",
    icon: ClipboardList,
    children: [
      { href: "/Gestion_administrative/admission", label: "Admission patient", icon: Users },
      { href: "/Gestion_administrative/profil_patient", label: "Profil patient", icon: FileText },
      { href: "/Gestion_administrative/hospitalisation", label: "Hospitalisation", icon: Calendar },
    ],
  },

  {
    href: "/infirmerie",
    label: "Infirmerie",
    icon: Stethoscope,
    children: [
      {
        href: "/infirmerie",
        label: "Patients en attente",
        icon: Users,
      },
      {
        href: "/infirmerie/patient-deja-consulte",
        label: "Patients déjà consultés",
        icon: ClipboardCheck,
      },
    ],
  },

  {
    href: "/collaboration_team", label: "Équipe soignante", icon: Activity,
    children: [
      {
        href: "/collaboration_team/view_team",
        label: "Vue Équipe",
        icon: Users,
      },
      {
        href: "/collaboration_team/communication_interne",
        label: "Communication",
        icon: MessageSquare,
      },
      {
        href: "/collaboration_team/reunion",
        label: "Réunion RCP",
        icon: CalendarCheck,
      },
    ]
  },
  { href: "/doc_tracabilite", label: "Doc & Traçabilité", icon: FileText },
  {
    href: "/dossier_medical",
    label: "Dossier Médical",
    icon: FolderOpen,
    children: [
      { label: "Consultation", href: "/dossier_medical/consultation", icon: Stethoscope },
      { label: "Diagnostique", href: "/dossier_medical/diagnostique", icon: ClipboardList },
      // { label: "Plan de Soins", href: "/dossier_medical/plan_de_soins", icon: HeartPulse },
      { label: "Prescription Médicaments", href: "/dossier_medical/prescription_medicaments", icon: Pill },
      { label: "Prescription Examens", href: "/dossier_medical/prescription_examen", icon: FlaskConical },
      // { label: "Compte-rendu", href: "/dossier_medical/compte_rendu", icon: FileCheck },
    ],
  },
  {
    href: "/resultats_examen",
    label: "Résultats Examens",
    icon: FlaskConical,
    children: [
      { label: "Biologie", href: "/resultats_examen/biologie", icon: FlaskConical },
      { label: "Imagerie", href: "/resultats_examen/imagerie", icon: ImageIcon },
      { label: "Autres Examens", href: "/resultats_examen/autres_examens", icon: Microscope },
    ],
  },
  { href: "/securite_conformite", label: "Sécurité", icon: Shield },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Independent open/close state per group
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navItems.forEach((item) => {
      if (item.children) {
        initial[item.href] =
          item.children.some((c) => pathname.startsWith(c.href)) ||
          pathname === item.href;
      }
    });
    return initial;
  });

  const toggleGroup = (href: string) =>
    setOpenGroups((prev) => ({ ...prev, [href]: !prev[href] }));

  return (
    <>
      <aside
        className="fixed left-0 top-0 h-screen flex flex-col z-30 transition-all duration-300 ease-in-out shadow-xl"
        style={{
          width: collapsed ? "72px" : "260px",
          background: "linear-gradient(180deg, #0f766e 0%, #115e59 100%)",
        }}
      >
        {/* ── Logo ── */}
        <div
          className="flex items-center border-b border-white/10 flex-shrink-0"
          style={{
            height: 72,
            padding: collapsed ? "0 16px" : "0 20px",
            gap: 12,
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-white font-bold text-[15px] leading-tight whitespace-nowrap">
                DPI
              </p>
              <p className="text-teal-200 text-[11px] whitespace-nowrap">
                Dossier Patient Informatisé
              </p>
            </div>
          )}
        </div>

        {/* ── Collapse toggle button ── */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-[54px] w-7 h-7 bg-white rounded-full shadow-md border border-slate-200 flex items-center justify-center hover:bg-teal-50 transition-colors z-50"
          title={collapsed ? "Déplier" : "Replier"}
        >
          {collapsed
            ? <PanelLeftOpen className="w-3.5 h-3.5 text-teal-700" />
            : <PanelLeftClose className="w-3.5 h-3.5 text-teal-700" />}
        </button>

        {/* ── Navigation ── */}
        <nav
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ padding: collapsed ? "12px 8px" : "12px 10px" }}
        >
          {navItems.map((item) => {

            /* ── GROUP ── */
            if (item.children) {
              const isOpen = openGroups[item.href] ?? false;
              const groupActive =
                pathname === item.href ||
                item.children.some((c) => pathname.startsWith(c.href));

              return (
                <div key={item.href} className="mb-0.5">

                  {/* Header row */}
                  {collapsed ? (
                    <Link
                      href={item.href}
                      title={item.label}
                      className={`flex items-center justify-center w-full h-10 rounded-xl transition-all duration-200 ${groupActive
                        ? "bg-white/20 text-white"
                        : "text-teal-100 hover:bg-white/10"
                        }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      title={item.label}>
                      <button
                        onClick={() => toggleGroup(item.href)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left ${groupActive
                          ? "bg-white/15 text-white"
                          : "text-teal-100 hover:bg-white/10"
                          }`}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="flex-1 text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap overflow-hidden">
                          {item.label}
                        </span>
                        <ChevronRight
                          className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
                          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                        />
                      </button>
                    </Link>
                  )}

                  {/* Children */}
                  {!collapsed && isOpen && (
                    <div className="mt-0.5 ml-3 pl-3 border-l border-white/20 space-y-0.5 pb-1">
                      {item.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 text-[13px] font-medium ${childActive
                              ? "bg-white/20 text-white font-semibold"
                              : "text-teal-100 hover:bg-white/10"
                              }`}
                          >
                            <child.icon className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="whitespace-nowrap overflow-hidden leading-tight">
                              {child.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            /* ── SIMPLE item ── */
            const active = pathname === item.href;
            return collapsed ? (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`flex items-center justify-center w-full h-10 rounded-xl mb-0.5 transition-all duration-200 ${active ? "bg-white/20 text-white" : "text-teal-100 hover:bg-white/10"
                  }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-200 text-[13px] font-medium ${active
                  ? "bg-white/20 text-white font-semibold"
                  : "text-teal-100 hover:bg-white/10"
                  }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ── Logout ── */}
        <div
          className="flex-shrink-0 border-t border-white/10"
          style={{ padding: collapsed ? "12px 8px" : "12px 10px" }}
        >
          {collapsed ? (
            <button
              title="Déconnexion"
              className="flex items-center justify-center w-full h-10 rounded-xl text-red-300 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors text-[13px] font-medium">
              <LogOut className="w-4 h-4" />
              <span className="whitespace-nowrap">Déconnexion</span>
            </button>
          )}
        </div>
      </aside>

      {/* Reactive main offset */}
      <style>{`
        main {
          margin-left: ${collapsed ? "72px" : "260px"} !important;
          transition: margin-left 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}