export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  matricule: string;
  role: string;
  from: any;
  to: any;
  zoneId?: string;
}
