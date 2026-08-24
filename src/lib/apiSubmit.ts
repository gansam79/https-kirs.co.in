import { getApiBasePath, getBasePath } from "./basePath";

export interface LeadSubmissionPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  companyName?: string;
  service?: string;
  claimType?: string;
  assetType?: string;
  holdingType?: string;
  date?: string;
  slot?: string;
  notes?: string;
  message?: string;
  comments?: string;
  type?: string;
  sharesHeld?: string;
  estimatedShares?: string;
  folioNumber?: string;
  hasOldCertificates?: boolean;
  isDeceased?: boolean;
  estimatedValue?: string;
  approxValue?: string;
  legalSuccessionStatus?: string;
  selectedDocs?: string[];
  [key: string]: any;
}

export async function submitLeadForm(payload: LeadSubmissionPayload): Promise<{ success: boolean; message: string }> {
  const apiPath = getApiBasePath();
  const basePath = getBasePath();
  const endpoints = [
    `${apiPath}/api/contact`,
    `${basePath}/api/contact`,
    `/api/contact`,
    `/api/contact.php`,
    `${basePath}/api/contact.php`,
  ];

  // Remove duplicates
  const uniqueEndpoints = Array.from(new Set(endpoints));

  let lastError: Error | null = null;

  for (const endpoint of uniqueEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({ success: true, message: "Lead submitted." }));
        return { success: true, message: data.message || "Lead recorded successfully." };
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`Lead submission attempt on ${endpoint} failed, trying next fallback:`, err.message);
    }
  }

  throw lastError || new Error("Unable to submit consultation request. Please contact +91 98236 62901 directly.");
}
