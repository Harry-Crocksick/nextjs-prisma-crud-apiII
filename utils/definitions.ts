export type BtnProps = {
  children: React.ReactNode;
  styles: string;
  btnType: "submit" | "button" | "reset";
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
