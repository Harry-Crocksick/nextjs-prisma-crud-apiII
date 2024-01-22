export type BtnProps = {
  children: React.ReactNode;
  styles: string;
  btnType: "submit" | "button" | "reset";
};

export type PostProps = {
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  details: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UserStateProps = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[] | null;
    password?: string[] | null;
  };
  message?: string | null;
};

export type PostStateProps = {
  errors?: {
    email?: string[];
    title?: string[];
    description?: string[];
    details?: string[];
    thumbnail?: string[] | null;
  };
  message?: string | null;
};
