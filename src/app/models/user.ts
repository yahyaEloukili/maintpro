export interface User {
  id: string;
  nom: String;
  prenom: String;
  email: String;
  password: String;
  matricule: string;
  role: string;
  from: any;
  to: any;
  zoneId?: string;
}
