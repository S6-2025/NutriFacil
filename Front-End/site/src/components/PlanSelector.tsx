import React from 'react';

interface PlanSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlanSelector = ({ isOpen, onClose }: PlanSelectorProps) => {
  return (
    <aside className={`plan-selector ${isOpen ? "open" : ""}`}>
      <div className="close-header">
        <svg className="header__SVG" onClick={onClose}>
          <use xlinkHref="/icons.svg#close-black" />
        </svg>
      </div>

      <h2 className="section-title">Escolha um Plano</h2>

      <div className="plans-container">
        <div className="plan-card">
          <h3>Free</h3>
          <p>R$0/Mês</p>
          <ul>
            <li>Acesso Básico</li>
            <li>Suporte limitado</li>
          </ul>
          <div className="button-wrapper">
            <button className="change-plan-button">Assinar</button>
          </div>
        </div>

        <div className="plan-card">
          <h3>Pro</h3>
          <p>R$39,99/Mês</p>
          <ul>
            <li>Acesso ilimitado</li>
            <li>Suporte prioritário</li>
            <li>Análises avançadas</li>
          </ul>
         <div className="button-wrapper">
            <button className="change-plan-button">Assinar</button>
          </div>
        </div>

        <div className="plan-card">
          <h3>Enterprise</h3>
          <p>R$100/Mês</p>
          <ul>
            <li>
              Todos os recursos do <span className="pro">Pro</span>
            </li>
            <li>Gerente de conta dedicado</li>
            <li>Integrações personalizadas</li>
          </ul>
         <div className="button-wrapper">
            <button className="change-plan-button">Fale Conosco</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PlanSelector;
