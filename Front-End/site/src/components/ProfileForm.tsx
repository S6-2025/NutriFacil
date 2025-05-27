import React from "react";

interface UserData {
  name: string;
  genre: string;
  birthDate: string;
  telephone: string;
  email: string;
  password: string;
}

interface ProfileFormProps {
  userData: UserData;
  isEditing: boolean;
  onChange: (field: keyof UserData, value: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  userData,
  isEditing,
  onChange,
}) => {
  return (
    <form className="form-personal">
      <div className="personal-camps">
        <label htmlFor="name-info">Nome:</label>
        <input
          type="text"
          id="name-info"
          name="name-info"
          required
          disabled={!isEditing}
          value={userData.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </div>

      <div className="personal-camps">
        <label htmlFor="genre-info">Sexo:</label>
        <input
          type="text"
          id="genre-info"
          name="genre-info"
          required
          disabled={!isEditing}
          value={userData.genre}
          onChange={(e) => onChange("genre", e.target.value)}
        />
      </div>

      <div className="personal-camps">
        <label htmlFor="birth-info">Data de nascimento:</label>
        <input
          type="date"
          id="birth-info"
          name="birth-info"
          required
          disabled={!isEditing}
          value={userData.birthDate}
          onChange={(e) => onChange("birthDate", e.target.value)}
        />
      </div>

      <div className="personal-camps">
        <label htmlFor="telephone-info">Telefone:</label>
        <input
          type="text"
          id="telephone-info"
          name="telephone-info"
          required
          disabled={!isEditing}
          value={userData.telephone}
          onChange={(e) => onChange("telephone", e.target.value)}
        />
      </div>

      <div className="info-camps">
        <label htmlFor="email-info">Email:</label>
        <input
          type="email"
          id="email-info"
          name="email-info"
          disabled={!isEditing}
          value={userData.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>

      <div className="info-camps">
        <label htmlFor="password-info">Senha:</label>
        <input
          type="password"
          id="password-info"
          name="password-info"
          disabled={!isEditing}
          value={userData.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
      </div>
    </form>
  );
};

export default ProfileForm;
