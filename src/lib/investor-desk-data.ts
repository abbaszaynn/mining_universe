import { companies } from "@/lib/companies-data";

export type InvestorDeskCompany = {
  id: string;
  name: string;
  mines: string[];
};

export function getInvestorDeskCompanies(): InvestorDeskCompany[] {
  return companies.map((company) => ({
    id: company.id,
    name: company.name,
    mines: company.projects.map((project) => project.name),
  }));
}
