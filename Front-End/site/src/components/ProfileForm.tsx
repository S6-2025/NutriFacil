import React from "react";

export interface UserData {
  name: string;
  genre: string;
  birthDate: string;
  telephone: string;
  email: string;
  password: string;
  weight: string; // antes era number
  height: string; 
}

interface ProfileFormProps {
  userData: UserData;
  isEditing: boolean;
  onChange: (field: keyof UserData, value: string) => void;
}

// Função utilitária para tratar campos numéricos com limites
const handleNumberFieldChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: keyof UserData,
  min: number,
  max: number,
  onChange: (field: keyof UserData, value: string) => void
) => {
  const rawValue = e.target.value;

  // Permitir valor vazio (durante edição)
  if (rawValue === "") {
    onChange(field, rawValue);
    return;
  }

  // Permitir que o usuário digite número com ponto (ex: "1.", "1.7")
  const isValidFloatFormat = /^(\d+)?(\.\d*)?$/.test(rawValue);
  if (!isValidFloatFormat) return;

  const parsed = parseFloat(rawValue);
  if (!isNaN(parsed) && parsed >= min && parsed <= max) {
    onChange(field, rawValue);
  } else if (!isNaN(parsed)) {
    // Permitir digitação intermediária mesmo fora do limite
    onChange(field, rawValue);
  }
};


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

  <div className="personal-camps">
  <label htmlFor="weight-info">Peso (kg):</label>
  <input
    type="text"  // text para controlar melhor
    id="weight-info"
    name="weight-info"
    required
    disabled={!isEditing}
    value={userData.weight}
    onChange={(e) => {
      let raw = e.target.value;

      // Remove tudo que não for dígito
      let digits = raw.replace(/\D/g, "");

      // Limita até 3 dígitos (max 999)
      if (digits.length > 3) digits = digits.slice(0, 3);

      // Se vazio permite apagar
      if (digits === "") {
        onChange("weight", "");
        return;
      }

      // Parse int e valida max 999
      const numericValue = parseInt(digits, 10);
      if (!isNaN(numericValue) && numericValue <= 999) {
        onChange("weight", numericValue.toString());
      }
    }}

  />
</div>


<div className="personal-camps">
  <label htmlFor="height-info">Altura (m):</label>
  <input
    type="text"
    id="height-info"
    name="height-info"
    required
    disabled={!isEditing}
    maxLength={4} // máximo 3 dígitos + ponto
    value={userData.height}
    onChange={(e) => {
      let raw = e.target.value;

      // Remove tudo que não for dígito
      let digits = raw.replace(/\D/g, "");

      // Limitar a 3 dígitos (ex: '310' para 3.10)
      if (digits.length > 3) digits = digits.slice(0, 3);

      // Se não tem dígito, valor vazio (permitir apagar tudo)
      if (digits.length === 0) {
        onChange("height", "");
        return;
      }

      // Montar string com ponto só se tiver 2 ou mais dígitos
      let formatted;
      if (digits.length === 1) {
        // Apenas um dígito, sem ponto
        formatted = digits;
      } else if (digits.length === 2) {
        // Um dígito + ponto + 1 dígito: x.x
        formatted = digits[0] + "." + digits[1];
      } else {
        // 3 dígitos: x.xx
        formatted = digits[0] + "." + digits[1] + digits[2];
      }

      // Validar se valor <= 3.10
      const numericValue = parseFloat(formatted);
      if (!isNaN(numericValue) && numericValue <= 3.10) {
        onChange("height", formatted);
      }
    }}
   
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
