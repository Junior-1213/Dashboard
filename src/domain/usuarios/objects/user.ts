export interface User {
  status: string;
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  /** Rol de acceso */
  role?: "admin" | "user";
  /** Fecha de creación en formato ISO */
  createdAt?: string;
  /** Id del dueño/propietario de la cuenta */
  ownerId: string;
}
