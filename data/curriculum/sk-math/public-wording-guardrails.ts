import type { CurriculumPublicWordingGuardrail } from "@/types";

export const SK_MATH_PUBLIC_WORDING_GUARDRAILS: CurriculumPublicWordingGuardrail[] = [
  {
    id: "school_curriculum_preparation",
    label: "School curriculum preparation wording",
    riskLevel: "safe",
    allowedWording: [
      "School curriculum content is being prepared.",
      "We are checking topics against official sources.",
      "Obsah školského učiva pripravujeme a overujeme podľa oficiálnych podkladov."
    ],
    blockedWording: [
      "Fully aligned with the Slovak national curriculum.",
      "Verified ŠVP curriculum.",
      "Kompletne overené podľa ŠVP."
    ],
    rationale:
      "Current curriculum modules are draft scaffolds. Official sources are identified and some mapping evidence exists, but final module verification is not complete."
  },
  {
    id: "confirmed_mapping_not_verification",
    label: "Confirmed mapping is not final verification",
    riskLevel: "caution",
    allowedWording: [
      "This module has a confirmed mapping to an official curriculum component.",
      "Mapping confirms the likely official component, not full lesson verification.",
      "Mapovanie modulu na oficiálny komponent je potvrdené, ale obsah modulu ešte nie je finálne overený."
    ],
    blockedWording: [
      "This module is verified.",
      "This lesson is officially approved.",
      "Modul je overený podľa ŠVP."
    ],
    rationale:
      "The first module mapping is confirmed, but the module verificationStatus remains source_identified until lesson and assessment content are reviewed."
  },
  {
    id: "visual_arithmetic_remediation_claim",
    label: "Visual Arithmetic remediation wording",
    riskLevel: "caution",
    allowedWording: [
      "Visual Arithmetic can support remediation when a child needs stronger number foundations.",
      "Visual Arithmetic is a product learning path, not an official curriculum requirement.",
      "Vizuálna aritmetika slúži ako produktová remediačná cesta, nie ako oficiálna požiadavka učiva."
    ],
    blockedWording: [
      "Visual Arithmetic is required by the Slovak curriculum.",
      "ŠVP requires this remediation path.",
      "Vizuálna aritmetika je povinnou súčasťou ŠVP."
    ],
    rationale:
      "Visual Arithmetic is an internal/product remediation pathway and should not be presented as an official curriculum requirement."
  }
];
